import { ref, computed, triggerRef, onMounted, onBeforeUnmount, watchEffect, type Ref } from 'vue';

export const fastClone = <T,>(obj: T): T | undefined =>
  obj === undefined ? undefined : JSON.parse(JSON.stringify(obj));

export function useTina<T extends Record<string, any>>(props: {
  query: string;
  variables: object;
  data: T | null;
}): { data: Ref<T>; isClient: Ref<boolean> } {
  const id = computed(() => hashFromQuery(JSON.stringify({ query: props.query, variables: props.variables })));

  const defaultData: T = { ...(props.data || {}) } as T;
  const dataRef = ref<T>(defaultData) as Ref<T>;
  const isClient = ref(typeof window !== 'undefined');
  const quickEditEnabled = ref(false);

  const handleMessage = (event: MessageEvent) => {

    if (event.data.id === id.value && event.data.type === "updateData") {
      if (!event.data.data) {
        return;
      }
      dataRef.value = fastClone(event.data.data.post); 
      triggerRef(dataRef);
    }

    if (event.data.type === "quickEditEnabled") {
      quickEditEnabled.value = event.data.value;
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('message', handleMessage);
  }

  onMounted(() => {
    isClient.value = true;
    window.top?.postMessage({ type: "quick-edit", value: true }, window.location.origin);

    window.top?.postMessage(
      { type: 'open', ...fastClone(props), id: id.value },
      window.location.origin
    );
  });

  onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('message', handleMessage);
      window.top?.postMessage({ type: 'close', id: id.value }, window.location.origin);
    }
  });

  const applyQuickEditStyles = () => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = `
    [data-tina-field] {
      outline: 2px dashed rgba(34,150,254,0.5);
      transition: box-shadow ease-out 150ms;
    }
    [data-tina-field]:hover {
      box-shadow: inset 100vi 100vh rgba(34,150,254,0.3);
      outline: 2px solid rgba(34,150,254,1);
      cursor: pointer;
    }
    [data-tina-field-overlay] {
      outline: 2px dashed rgba(34,150,254,0.5);
      position: relative;
    }
    [data-tina-field-overlay]:hover {
      cursor: pointer;
      outline: 2px solid rgba(34,150,254,1);
    }
    [data-tina-field-overlay]::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 20;
      transition: opacity ease-out 150ms;
      background-color: rgba(34,150,254,0.3);
      opacity: 0;
    }
    [data-tina-field-overlay]:hover::after {
      opacity: 1;
    }
  `;
    document.head.appendChild(style);
    document.body.classList.add('__tina-quick-editing-enabled');

    const mouseDownHandler = (e: MouseEvent) => {
      const attributeNames = (e.target as HTMLElement).getAttributeNames();
      const tinaAttribute = attributeNames.find((name) =>
        name.startsWith('data-tina-field')
      );
      let fieldName;

      if (tinaAttribute) {
        e.preventDefault();
        e.stopPropagation();
        fieldName = (e.target as HTMLElement).getAttribute(tinaAttribute);
      } else {
        const ancestor = (e.target as HTMLElement).closest('[data-tina-field], [data-tina-field-overlay]');
        if (ancestor) {
          const ancestorAttributeNames = ancestor.getAttributeNames();
          const ancestorTinaAttribute = ancestorAttributeNames.find((name) =>
            name.startsWith('data-tina-field')
          );
          if (ancestorTinaAttribute) {
            e.preventDefault();
            e.stopPropagation();
            fieldName = ancestor.getAttribute(ancestorTinaAttribute);
          }
        }
      }

      if (fieldName) {
        window.top?.postMessage(
          { type: 'field:selected', fieldName: fieldName },
          window.location.origin
        );
      }
    };

    document.addEventListener('click', mouseDownHandler, true);

    // Cleanup when the component is destroyed
    onBeforeUnmount(() => {
      document.removeEventListener('click', mouseDownHandler, true);
      document.body.classList.remove('__tina-quick-editing-enabled');
      style.remove();
    });
  };

  // Watch for quick edit mode
  watchEffect(() => {
    if (quickEditEnabled.value) {
      applyQuickEditStyles();
    }
  });

  return { data: dataRef, isClient };
}

function hashFromQuery(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) - hash + input.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(hash).toString(36);
}

