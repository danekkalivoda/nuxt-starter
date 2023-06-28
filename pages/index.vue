<script lang="ts" setup>
import Input from "~/recruitis-shared/components/forms/input.vue";
import Button from "~/recruitis-shared/components/forms/button.vue";
import Dialog from "~/recruitis-shared/components/dialog.vue";
import FormFields from "~/recruitis-shared/components/forms/formFields.vue";
import Dropdown from "~/recruitis-shared/components/dropdown.vue";
definePageMeta({ auth: false });
const dropdown = ref(false);
const fields = ref([
    {
        label: "Date range",
        name: "range",
        type: "dateRange",
        description: "Pokud nezadáte své jméno, ukončete prosím nábor.",
        initialValue: ["01.03.2023", "31.03.2023"],
        id: "1",
    },
    {
        label: "Date",
        name: "date",
        type: "date",
        initialValue: "01.03.2023",
        id: "2",
    },

    {
        label: "Multiselect",
        name: "multiselect",
        type: "multiSelect",
        placeholder: "Celá společnost",
        initialValue: ["2"],
        options: [
            { label: "Štěpán Bartyzal", value: "2" },
            { label: "Jiří Landovský", value: "3" },
        ],
        id: "3",
    },
    {
        label: "Single select",
        name: "select",
        type: "select",
        placeholder: "Celá společnost",
        initialValue: 2,
        options: [
            { label: "Štěpán Bartyzal", value: 2 },
            { label: "Jiří Landovský", value: 3 },
        ],
        id: "4",
    },
    {
        label: "Input",
        name: "myinput",
        type: "input",
        message: {
            type: "error",
            text: "Toto pole je povinné, vyplňte jej prosím.",
        },
        initialValue: "this is my text",
        id: "5",
    },
    {
        label: "Filelist & upload",
        name: "filelistUpload",
        type: "fileUpload",
        id: "6",
    },
    {
        label: "Checkboxes",
        name: "checkme",
        type: "checkboxes",
        message: {
            type: "error",
            text: "Toto pole je povinné, vyplňte jej prosím.",
        },
        initialValue: ["checkbox 1", "checkbox 2"],
        options: [
            { label: "Value 1", value: "checkbox 1" },
            { label: "Value 2", value: "checkbox 2" },
        ],
        id: "7",
    },
    {
        label: "Checkboxes - inline",
        name: "checkme",
        type: "checkboxes",
        description: "Zaškrtněte, zda je uchazeč trestně bezúhonný na základě opisu nebo potvrzení",
        message: {
            type: "error",
            text: "Toto pole je povinné, vyplňte jej prosím.",
        },
        inline: true,
        initialValue: ["checkbox 4"],
        options: [
            { label: "Ano", value: "checkbox 3" },
            { label: "Teprve se ale ukáže", value: "checkbox 4" },
        ],
        id: "8",
    },
    {
        label: "Radio group",
        name: "makeachoice",
        type: "radioGroup",
        options: [
            { label: "Value 1", value: "radio 1" },
            { label: "Value 2", value: "radio 2" },
        ],
        initialValue: "radio 1",
        message: {
            type: "error",
            text: "Toto pole je povinné, vyplňte jej prosím.",
        },
        id: "9",
    },
]);
</script>
<template>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="text-red">homepage</div>
        <div class="prose">
            <h1>Prose heading</h1>
            <p>prose text</p>
        </div>
        <nuxt-link to="/protected/globally">To protected</nuxt-link>
        <div class="p-2">
            <Input :controlled="false" />
            <Button theme="primary">Button</Button>
            <Dialog :open="false">tady</Dialog>
            <FormFields :fields="fields" :controlled="false" />
            <Dropdown :is-open="dropdown" @update:is-open="(value) => (dropdown = value)">
                <div>tady</div>
            </Dropdown>
        </div>
    </div>
</template>
