# VT Form
Create a dynamic & reactive form with built-in validation by only defining a [Zod](https://zod.dev) schema. Uses [shadcn-vue](https://www.shadcn-vue.com/) components.

## Contents
- [Install](#install)
- [Usage](#usage)
- [Stepper](#stepper)
- [Custom Component Registry](#custom-component-registry)
- [Form Components](#form-components)

## Install
To install, run:
```bash
npm install @vulptech/vt-form
```
or
```bash
pnpm add @vulptech/vt-form
```

## Usage
A simple example of creating a form containing a single text input.

```vue
<script lang="ts" setup>
import * as z  from "zod";
import { FormBuilder, formField, useVtForm } from "@vulptech/vt-form";

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

const { formData, isValid } = useVtForm(schema);
</script>

<template>
    <FormBuilder :schema="schema" v-model="formData" />
</template>
```

## Stepper
The form can be optionally rendered as a stepper, where you can group fields in your schema to steps. Each step also contains its own validation state.

```vue
<script lang="ts" setup>
import * as z  from "zod";
import { FormBuilder, formField, useVtForm, type StepConfig } from "@vulptech/vt-form";

const schema = z.object({
    text: formField(z.string(), {
        label: "text",
        type: "text",
        step: "step1",
    }),
    number: formField(z.number(), {
        label: "number",
        type: "number",
        step: "step2",
    }),
    tags: formField(z.string().array(), {
        label: "tags",
        type: "tags",
        step: "step3",
    }),
});

const stepsConfig: StepConfig = {
    type: "stepper",
    orientation: "horizontal",
    steps: [
        {
            id: "step1",
            label: "Step 1",
            description: "Description of step 1",
            class: "grid grid-cols-2 gap-2"
        },
        {
            id: "step2",
            label: "Step 2",
            description: "Description of step 2"
        },
        {
            id: "step3",
            label: "Step 3",
            description: "Description of step 3"
        },
    ],
};

const { formData, isValid, steps } = useVtForm(schema, { steps: stepConfig });
</script>

<template>
    <FormBuilder :schema="schema" :steps="steps" v-model="formData" />
</template>
```

## Custom Component Registry
You can register your own components and use them in dynamic forms by declaring your own form field types:

```vue
<script lang="ts" setup>
import * as z  from "zod";
import { FormBuilder, formField, useVtForm, type Registry } from "@vulptech/vt-form";

const schema = z.object({
    text: formField(z.string(), {
        label: "text",
        description: "description",
        type: "text",
        initial: "",
        placeholder: "placeholder",
        tooltip: "tooltip",
    }),
    // custom field type
    custom: formField<z.ZodTypeAny, any>(z.string(), {
        label: "custom",
        description: "description",
        type: "custom",
        initial: "",
        tooltip: "tooltip",
    }),
});

// user-provided component registry
const registry: Registry = {
    custom: {
        component: MyComponent,
        props: {
            myProp: (def, meta, model) => meta.myProp,
        },
    },
};

const { formData, isValid } = useVtForm(schema);
</script>

<template>
    <FormBuilder :schema="schema" v-model="formData" :registry="registry" />
</template>
```

## Form Components

Field Type|Zod Type|Options|Component
:-:|:-:|-|-
text|`z.string()`|<pre lang="typescript">{&#13;  type: "text";&#13;  initial: string;&#13;  resetValue?: string;&#13;  emptyValue?: string;&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|![Text input example](/docs/textInput.png)
url|`z.string().url()`|<pre lang="typescript">{&#13;  type: "url";&#13;  initial: string;&#13;  resetValue?: string;&#13;  emptyValue?: string;&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|Same as text input
email|`z.string().email()`|<pre lang="typescript">{&#13;  type: "email";&#13;  initial: string;&#13;  resetValue?: string;&#13;  emptyValue?: string;&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|Same as text input
tel|`z.string()`|<pre lang="typescript">{&#13;  type: "tel";&#13;  initial: string;&#13;  resetValue?: string;&#13;  emptyValue?: string;&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|Same as text input
password|`z.string()`|<pre lang="typescript">{&#13;  type: "password";&#13;  initial: string;&#13;  resetValue?: string;&#13;  emptyValue?: string;&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|![Password input example](/docs/passwordInput.png)
date|`z.string().date()`|<pre lang="typescript">{&#13;  type: "date";&#13;  initial: string;&#13;  resetValue?: string;&#13;  emptyValue?: string;&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|![Date input example](/docs/dateInput.png)
textarea|`z.string()`|<pre lang="typescript">{&#13;  type: "textarea";&#13;  initial: string;&#13;  resetValue?: string;&#13;  emptyValue?: string;&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|![Textarea input example](/docs/textareaInput.png)
group|`z.object()`|<pre lang="typescript">{&#13;  type: "group";&#13;  initial: any;&#13;  resetValue?: any;&#13;  emptyValue?: any;&#13;  groupClass?: string;&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|![group input example](/docs/groupInput.png)
number|`z.number()`|<pre lang="typescript">{&#13;  type: "number";&#13;  initial: number;&#13;  resetValue?: number;&#13;  emptyValue?: number;&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|![Number input example](/docs/numberInput.png)
range|`z.number()` or `z.number().array()`|<pre lang="typescript">{&#13;  type: "range";&#13;  initial: number \| number[];&#13;  resetValue?: number \| number[];&#13;  emptyValue?: number \| number[];&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|![Range input example](/docs/rangeInput.png)
select|`z.string()` or `z.string().array()`|<pre lang="typescript">{&#13;  type: "select";&#13;  options: {label: string; value: string}[];&#13;  initial: string \| string[];&#13;  resetValue?: string \| string[];&#13;  emptyValue?: string \| string[];&#13;  multiple?: boolean;&#13;  hideSearch?: boolean;&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|![Select input example](/docs/selectInput.png)
search|any|<pre lang="typescript">{&#13;  type: "search";&#13;  listQuery?: (arg: string) => {label: string; value: string}[];&#13;  getQuery?: (arg: string) => any;&#13;  resultLabel?: string;&#13;  initial: any;&#13;  resetValue?: any;&#13;  emptyValue?: any;&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|![Search input example](/docs/searchInput.png)
add|any[]|<pre lang="typescript">{&#13;  type: "add";&#13;  element?: any;&#13;  initial: any[];&#13;  resetValue?: any[];&#13;  emptyValue?: any[];&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|![Add input example](/docs/addInput.png)
radio|`z.string()`|<pre lang="typescript">{&#13;  type: "radio";&#13;  options: {label: string; value: string}[];&#13;  initial: string;&#13;  resetValue?: string;&#13;  emptyValue?: string;&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|![Radio input example](/docs/radioInput.png)
checkbox|any|<pre lang="typescript">{&#13;  type: "checkbox";&#13;  trueValue?: any;&#13;  falseValue?: any;&#13;  initial: any;&#13;  resetValue?: any;&#13;  emptyValue?: any;&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|![Checkbox input example](/docs/checkboxInput.png)
switch|any|<pre lang="typescript">{&#13;  type: "switch";&#13;  trueValue?: any;&#13;  falseValue?: any;&#13;  falseLabel?: string;&#13;  initial: any;&#13;  resetValue?: any;&#13;  emptyValue?: any;&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|![switch input example](/docs/switchInput.png)
rating|`z.number()`|<pre lang="typescript">{&#13;  type: "rating";&#13;  initial: number;&#13;  icon?: "star" \| "number" = "star";&#13;  resetValue?: number;&#13;  emptyValue?: number;&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|![rating input example](/docs/ratingInput.png)
tags|`z.string().array()`|<pre lang="typescript">{&#13;  type: "tags";&#13;  initial: string[];&#13;  resetValue?: string[];&#13;  emptyValue?: string[];&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|![tags input example](/docs/tagsInput.png)
hidden|any|<pre lang="typescript">{&#13;  type: "hidden";&#13;  initial: any;&#13;  resetValue?: any;&#13;  emptyValue?: any;&#13;  label?: string;&#13;  description?: string;&#13;  placeholder?: string;&#13;  style?: string;&#13;  class?: string;&#13;  tooltip?: string;&#13;}<pre>|
