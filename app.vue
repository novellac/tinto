<script setup lang="ts">
import { tinaField } from '@/composables/tinaField'
import { useTina } from '@/composables/useTina'
import { client } from '@/tina/__generated__/client'

import BaseNavMenu from './components/BaseNavMenu.vue'
import { ContentType } from './types'

const siteResponse = await client.queries.site({ relativePath: `global.json` })

const { data } = useTina({
  query: siteResponse.query,
  variables: siteResponse.variables,
  data: siteResponse.data.site,
  contentType: ContentType.SITE,
})
</script>

<template>
  <div class="body-wrapper">
    <a href="#content" class="skip-link">Skip to Main</a>
    <header>
      <BaseNavMenu :nav-items="data?.navItems ? data?.navItems : []" :site-name="data.siteName" />
    </header>
    <NuxtRouteAnnouncer />

    <main id="content">
      <NuxtPage />
    </main>

    <footer>
      <h2 class="text-4xl" :data-tina-field="tinaField(data, 'siteName')">
        {{ data.siteName }}
      </h2>
      <div class="prose lg:prose-xl mt-2" :data-tina-field="tinaField(data, 'footerText')">
        <TinaMarkdown :content="data?.footerText || []" />
      </div>
      <p :data-tina-field="tinaField(data, 'siteCopyright')">
        © {{ new Date().getFullYear() }} {{ data.siteCopyright }}
      </p>
    </footer>
  </div>
</template>
