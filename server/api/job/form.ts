import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
    interface FormItem {
        name: string
        initialValue: string | string[] | undefined
    }

    const formData: FormItem[] = await readBody(event)
    const data = formData.map((item) => ({
        name: item.name,
        value: item.initialValue,
    }))

    /*     await new Promise((resolve) => setTimeout(resolve, 2000)); */
    return {
        statusCode: 200,
        ok: true,
        data,
    }

    /* throw createError({ statusCode: 500, message: 'error' })      */
})
