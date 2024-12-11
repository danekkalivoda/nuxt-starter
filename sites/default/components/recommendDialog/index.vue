<script setup lang="ts">
import { useNotification } from 'naive-ui';
import type { FieldInterface } from '~/recruitis-shared/components/forms/formFields.vue';
const props = defineProps<{
    inModal?: boolean
}>();

const { data } = useAuth();
const notification = useNotification();
const formFields = ref<FieldInterface[]>([
    {
        'label': 'Date',
        'name': 'date',
        'type': 'date',
        'initialValue': '02.03.2023',
        'validations': ['isRequired'],
        'id': '2',
    },
    {
        'label': 'Input',
        'name': 'myinput1',
        'type': 'input',
        'initialValue': '',
        'id': '3',
        'validations': ['isRequired'],
    },
    {
        'label': 'Požadovaná mzda',
        'labelTooltip': {
            'text': 'Toto pole, je povinné.',
            'icon': 'required',
        },
        'name': 'myinputNumber1',
        'type': 'input',
        'initialValue': '',
        'id': '4',
        'validations': [
            {
                'type': 'regex',
                'value': '^[\\d ]+$',
                'message': 'Číslo může obsahovat pouze číslice bez mezer či speciálních znaků.',
            },
        ],
    },
    {
        'id': '51',
        'name': 'department1',
        'type': 'multiSelect',
        'label': 'Společnost',
        'initialValue': null,
        'validations': ['isRequired'],
        'options': [
            {
                'label': 'Test 1',
                'value': 'test1',
            },
            {
                'label': 'Test 2',
                'value': 'test2',
            },
            {
                'label': 'Test 3',
                'value': 'test3',
            },
            {
                'label': 'Test 4',
                'value': 'test4',
            },
        ],
    },
    {
        'label': 'Date',
        'name': 'date',
        'type': 'date',
        'initialValue': '02.03.2023',
        'validations': ['isRequired'],
        'id': '2',
    },
    {
        'label': 'Input',
        'name': 'myinput1',
        'type': 'input',
        'initialValue': '',
        'id': '3',
        'validations': ['isRequired'],
    },
    {
        'label': 'Požadovaná mzda',
        'labelTooltip': {
            'text': 'Toto pole, je povinné.',
            'icon': 'required',
        },
        'name': 'myinputNumber1',
        'type': 'input',
        'initialValue': '',
        'id': '4',
        'validations': [
            {
                'type': 'regex',
                'value': '^[\\d ]+$',
                'message': 'Číslo může obsahovat pouze číslice bez mezer či speciálních znaků.',
            },
        ],
    },
    {
        'id': '51',
        'name': 'department1',
        'type': 'multiSelect',
        'label': 'Společnost',
        'initialValue': null,
        'validations': ['isRequired'],
        'options': [
            {
                'label': 'Test 1',
                'value': 'test1',
            },
            {
                'label': 'Test 2',
                'value': 'test2',
            },
            {
                'label': 'Test 3',
                'value': 'test3',
            },
            {
                'label': 'Test 4',
                'value': 'test4',
            },
        ],
    },
    {
        'label': 'Date',
        'name': 'date',
        'type': 'date',
        'initialValue': '02.03.2023',
        'validations': ['isRequired'],
        'id': '2',
    },
    {
        'label': 'Input',
        'name': 'myinput1',
        'type': 'input',
        'initialValue': '',
        'id': '3',
        'validations': ['isRequired'],
    },
    {
        'label': 'Požadovaná mzda',
        'labelTooltip': {
            'text': 'Toto pole, je povinné.',
            'icon': 'required',
        },
        'name': 'myinputNumber1',
        'type': 'input',
        'initialValue': '',
        'id': '4',
        'validations': [
            {
                'type': 'regex',
                'value': '^[\\d ]+$',
                'message': 'Číslo může obsahovat pouze číslice bez mezer či speciálních znaků.',
            },
        ],
    },
    {
        'id': '51',
        'name': 'department1',
        'type': 'multiSelect',
        'label': 'Společnost',
        'initialValue': null,
        'validations': ['isRequired'],
        'options': [
            {
                'label': 'Test 1',
                'value': 'test1',
            },
            {
                'label': 'Test 2',
                'value': 'test2',
            },
            {
                'label': 'Test 3',
                'value': 'test3',
            },
            {
                'label': 'Test 4',
                'value': 'test4',
            },
        ],
    },
]);
const onSubmit = async (hasErrors?: boolean) => {
    if (hasErrors) {

    /* return */
    }
    await $fetch(
        '/api/jobs/form',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formFields.value),
            async onResponse({ request, options, response }) {
                const status = response._data.statusCode;
                switch (status) {
                    case 200:
                        notification.success({
                            title: 'Formulář byl úspěšně odeslán',
                            duration: 5000,
                        });
                        break;
                    default:
                        notification.error({
                            title: 'Chyba v odeslání formuláře',
                            duration: 5000,
                        });
                        break;
                }
            },
        },
    );
};
</script>

<template>
    <div
        class="flex w-full flex-col gap-4"
        :class="props.inModal ? '' : 'p-6'"
    >
        <h2 class="text-2xl font-bold">
            Doporoučte kandidáta
        </h2>
        Přihlášený: {{ data.user.name }} {{ data.user.surname }}
        <FormRenderer
            v-if="formFields"
            v-model:fields="formFields"
            @submit="onSubmit"
        ></FormRenderer>
    </div>
</template>
