<script setup lang="ts">
import { tinaField } from '@/composables/tinaField'
import { useTina } from '@/composables/useTina'
import { client } from '@/tina/__generated__/client'

const siteResponse = await client.queries.site({ relativePath: `global.json` })

const { data } = useTina({
  query: siteResponse.query,
  variables: siteResponse.variables,
  data: siteResponse.data.site,
})
</script>

<template>
  <div>
    <a href="#content" class="skip-link">Skip to Main</a>

    <NuxtRouteAnnouncer />

    <main id="content">
      <NuxtPage />
    </main>

    <footer class="bg-purple-100 p-4">
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
