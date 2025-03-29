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
    <NuxtRouteAnnouncer />

    <main>
      <NuxtPage />
    </main>
    <footer class="bg-purple-100 p-4">
      {{ data.siteName }}<br>
      <div class="prose lg:prose-xl mt-2" :data-tina-field="tinaField(data, 'footerText')">
        <TinaMarkdown :content="data?.footerText || []" />
      </div>
      <p>© {{ new Date().getFullYear() }} {{ data.siteCopyright }}</p>
    </footer>
  </div>
</template>
