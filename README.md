# Tinto - a Nuxt/Tina starter

[![Hippocratic License HL3-FULL](https://img.shields.io/static/v1?label=Hippocratic%20License&message=HL3-FULL&labelColor=5e2751&color=bc8c3d)](https://firstdonoharm.dev/version/3/0/full.html)

This is a repro I made from the proof of concept linked in the [Nuxt with Contextual Editing issue](https://github.com/tinacms/tinacms/issues/4691) on Github. You're welcome to fork or use as a template. Work not directly from the the original Vue example is covered under the [Hippocartic License HL3-FULL](https://firstdonoharm.dev/version/3/0/full.html).

It contains some of my Vue/Nuxt opinions. It's under active development, so it will continue to increase in opinions.

## Setup from blank repo

**Note: This repo has moved beyond the following instructions, but the following instructions should still get you started with a blank Nuxt repo and Tina's contextual editing feature.**

Reference the [Tina CMS Vue example](https://github.com/tinacms-examples/vue) code while following these instructions.

1. Run the Nuxt getting started commands to install Nuxt (don't install Nuxt Content, you probably won't need it)
2. Install Tina following Tina CMS's [framework-agnostic getting started guide](https://tina.io/docs/frameworks/other) (you can use 'public' for the folder question).
3. Update `nuxt.config.ts` with runtimeConfig API keys so Nuxt can access Tina while running, some route rules for easy navigating to the CMS, and hooks for processing data while using Tina (note you may have to do this for each content type).
4. Copy over the composables folder - `tinaField` and `useTina` for processing Tina fields and handling some contextual editing features.
5. Copy over the current components.
6. In `tina/config.ts` you'll find the following differences:

- `format: "mdx"` is added for easier processing of js in markdown. (note you won't need to use Nuxt to process the MDX, as you'll be using some functions from Tina to do so instead)
- a `ui` key with a router method - helps with redirecting to the contextual editor instead of the regular editor.
- In the `posts` example content type, `description` and `datetime` fields have been added. These should be considered to be optional, they're just used elsewhere in their example implementation.
- A `templates` key with a couple of example template fields have been added. These will be available in the richtext editor.

7. Copy over the `pages` directory. You'll eventually heavily edit this with your additional content types.
8. Optionally install TW or replace the TW classes with your own CSS.

## TODOs

- Bug: There's an ` ERROR  [unhandledRejection] write EPIPE ` that keeps getting called, though not exactly sure under what circumstances.
- Feature (nb, out of scope): Handle `strikethrough` processing from wysiwyg.
- Feature (nb, out of scope): Handle code blocks processing from wysiwyg.
- Bug (nb, out of scope): Block quotes in wysiwyg can't be terminated by clicking the button, you have to edit the markdown directly.
