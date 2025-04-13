import type { ContentType } from '~/types'
import CenteredProseBlock from '~/components/CenteredProseBlock.vue'
import HorizontalCardBlock from '~/components/HorizontalCardBlock.vue'
import IconCardsBlock from '~/components/IconCardsBlock.vue'
import ImageGalleryBlock from '~/components/ImageGalleryBlock.vue'
import LeftAlignedProseBlock from '~/components/LeftAlignedProseBlock.vue'
import TwoUpVerticalCardsBlock from '~/components/TwoUpVerticalCardsBlock.vue'
import VerticalCardBlock from '~/components/VerticalCardBlock.vue'

export function useBlockTemplate({ rawTemplateName, contentType }: { rawTemplateName: string, contentType: ContentType }) {
  // Tina's __typename property concats the content type + field name (in this case, "Blocks") + block field name.
  // Tip: If you're trying to use this composable and it's not working, first double-check that your field is named `Blocks`!
  const splitter = `${contentType.toLowerCase()}blocks`
  const stringToSplit = rawTemplateName.toLowerCase()
  const template = stringToSplit.slice(stringToSplit.indexOf(splitter) + splitter.length)

  switch (template) {
    case 'centeredproseblock':
      return CenteredProseBlock

    case 'leftalignedproseblock':
      return LeftAlignedProseBlock

    case 'horizontalcardblock':
      return HorizontalCardBlock

    case 'verticalcardblock':
      return VerticalCardBlock

    case 'twoupverticalcardsblock':
      return TwoUpVerticalCardsBlock

    case 'iconcardsblock':
      return IconCardsBlock

    case 'imagegalleryblock':
      return ImageGalleryBlock

    default:
      return HorizontalCardBlock
  }
}
