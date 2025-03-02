<script setup lang="ts">
import { computed, unref } from "vue";
import TinaMarkdown from "./TinaMarkdown.vue";
import Leaf from "./Leaf.vue";

const inlineNodeTypes = new Set([
  "text",
  "a",
  "bold",
  "italic",
  "strikethrough",
  "underline",
  "code",
]);

const defaultComponents: Record<string, any> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  a: "a",
  italic: "em",
  bold: "strong",
  strikethrough: "s",
  underline: "u",
  code: "code",
  text: "span",
  ul: "ul",
  ol: "ol",
  li: "li",
  blockquote: "blockquote",
  code_block: "pre",
  img: "img",
  hr: "hr",
  break: "br",
  table: "table",
  tr: "tr",
  th: "th",
  td: "td",
};

export type MarkdownElement = keyof typeof defaultComponents;

const props = defineProps<{
  child: {
    type: string;
    name?: string; // Used for identifying custom components in mdxJsxFlowElement
    children?: any[];
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
    [key: string]: any;
  };
  components?: Record<string, any>;
}>();

const childContent = computed(() => unref(props.child));

const nodeComponent = computed(() => {
  const type = childContent.value.type;
  
  if (type === "mdxJsxFlowElement") {
    const componentName = childContent.value.name || type;
    if (componentName && props.components?.[componentName]) {
      return props.components[componentName];
    }
  }

  if (type === "mdxJsxTextElement") {
    const componentName = childContent.value.name;
    if (componentName && props.components?.[componentName]) {
      return props.components[componentName];
    }
  }

  return props.components?.[type] || defaultComponents[type] || "span";
});


const passThroughProps = computed(() => {
  const { type, children, text, props, ...restProps } = childContent.value;

  if ((type === "mdxJsxFlowElement" || type === "mdxJsxTextElement") && props) {
    return { ...props }; 
  }

  // ✅ Fix `a` and `img` URL handling
  if (type === "a" && restProps.url) {
    return { ...restProps, href: restProps.url };
  }

  if (type === "img" && restProps.url) {
    return { ...restProps, src: restProps.url };
  }

  return restProps;
});


const isInline = computed(() => inlineNodeTypes.has(childContent.value.type));
</script>

<template>
  <component
    :is="nodeComponent"
    v-bind="passThroughProps"
    :style="{ display: isInline ? 'inline' : undefined }"
  >    
    <TinaMarkdown
      v-if="childContent.children"
      :content="childContent.children"
      :components="components"
    />
    <Leaf
      v-else-if="childContent.text"
      :text="childContent.text || ''"
      :bold="childContent.bold"
      :italic="childContent.italic"
      :underline="childContent.underline"
      :strikethrough="childContent.strikethrough"
      :code="childContent.code"
    />
  </component>
</template>
