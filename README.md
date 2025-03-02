# Tinto - a Nuxt/Tina example adapted from TinaCMS's Vue example

## Setup from blank repo

Reference the [Tina CMS Vue example](https://github.com/tinacms-examples/vue) code while following these instructions.

1. Run the Nuxt getting started commands to install Nuxt (don't install Nuxt Content, you probably won't need it)
2. Install Tina following Tina CMS's [framework-agnostic getting started guide](https://tina.io/docs/frameworks/other) (you can use 'public' for the folder question).
3. Update `nuxt.config.ts` with runtimeConfig API keys so Nuxt can access Tina while running, some route rules for easy navigating to the CMS, and hooks for processing data while using Tina (note you may have to do this for each content type).
4. Copy over the composables folder - `tinaField` and `useTina` for processing Tina fields and handling some contextual editing features.
5. Copy over the current components. You may want to nest these inside a `Base` or `Tina` folder so you can more clearly separate your components from these.
6. In `tina/config.ts` you'll find the following differences:

- `format: "mdx"` is added for easier processing of js in markdown.
- a `ui` key with a router method - helps with redirecting to the contextual editor instead of the regular editor.
- In the `posts` example content type, `description` and `datetime` fields have been added. These should be considered to be optional, they're just used elsewhere in their example implementation.
- A `templates` key with a couple of example template fields have been added. These will be available in the richtext editor.

7. Copy over the `pages` directory. You'll eventually heavily edit this with your additional content types.
8. Optionally install TW or replace the TW classes with your own CSS.

## TODOs

- Bug? There's an ` ERROR  [unhandledRejection] write EPIPE ` that keeps getting called, though not exactly sure under what circumstances.
- Feature: Handle `strikethrough` processing from wysiwyg.
- Feature: Handle code blocks processing from wysiwyg.
- Bug, but out of scope: Block quotes in wysiwyg can't be terminated by clicking the button, you have to edit the markdown directly.

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
