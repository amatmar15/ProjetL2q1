import { CollectionConfig } from 'payload/types'

export const Produit: CollectionConfig = {
    slug: 'Produits',
    fields: [
        {
            name: 'id',
            type: 'text',
            required: true,
        },
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,

        },
        {
            name: 'imageSrc',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'images',
            type: "array",
            fields: [
                {
                    name: 'image',
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
            ],
            required: true,
        },
        {
            name: 'sale',
            type: 'checkbox',
            defaultValue: false,
        },
        {
            name: 'price',
            type: 'number',
            required: true,
        },
        {
            name: 'priceDiscounted',
            type: 'number',
        },

        {
            name: 'priceRev',
            type: 'number',
        },
        // {
        //     name: 'review',
        //     type: 'textarea',
        // },
        {
            name: 'colors',
            type: 'array',
            fields: [
                {
                    name: 'color',
                    type: 'text',
                },
            ],
            required: true,
        },
        {
            name: 'inventory',
            type: 'number',
            required: true,
        },
    ],
    access: {
        read: (arg) => {
            return Boolean(true)
        },
        readVersions: (arg) => {
            return Boolean(true)
        },
        update: () => true,
        create: () => true,
        delete: () => true,
        admin: () => true,
        unlock: () => true,
    },

}


export const defaultPayloadAccess = () => {
    return true
}