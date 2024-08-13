<script lang="ts" setup>
/* import FormFields from "~/recruitis-shared/components/forms/formFields.vue";
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
        props: {
            detached: true,
        },
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
]); */
</script>
<template>
    <div class="grid-rows-auto mx-auto grid max-w-3xl gap-8 px-4">
        <p>{{ $t("welcome") }}</p>

        <div class="prose prose-headings:font-display">
            <h1>Homepage</h1>
            <p>prose text</p>
        </div>
        <h2 class="font-display font-normal">
            header h2
        </h2>
        <nuxt-link to="/protected/globally">
            To protected
        </nuxt-link>
    <!-- <FormFields :fields="fields" :controlled="false" /> -->
    </div>
</template>
