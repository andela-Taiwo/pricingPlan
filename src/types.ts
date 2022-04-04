export type TableDescriptors = {
    [key: string]:  {
        [key: string]: string
    }
}

export type Plan = {
    name: string
    pricing: {
        price: number
        description: string
    }
    reporting: {
        detailedReporting: boolean
        weeklyDataReports: boolean
        createReport: boolean
    }
    blog: {
        createBlog: boolean
        uploadImages: boolean
    }
    fileActions: {
        uploadFiles: boolean
        shareFiles: boolean
        watchVideos: boolean
    }
    applicationIntegrations: {
        installNewApps: boolean
        installCustomApps: boolean
    }
}
