# VT Form
Create a dynamic & reactive form with built-in validation by only defining a [Zod](https://zod.dev) schema.

## Install

```bash
pnpm add vt-form
```

## Usage
A simple example of creating a form containing a single text input.

```vue
<script lang="ts" setup>
import { ref } from "vue";
import * as z  from "zod";
import { FormBuilder, schemaCreateEmptyObject, formField } from "vt-form";

const schema = z.object({
    text: formField(z.string(), {
        label: "text",
        description: "description",
        type: "text",
        initial: "",
        placeholder: "placeholder",
        tooltip: "tooltip",
    }),
});

const { formData, validity, error, isValid } = useVtForm(schema);
</script>

<template>
    <FormBuilder :schema="schema" v-model="formData" />
</template>
```
