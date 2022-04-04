export const mockData = [
  {
    name: "Starter",
    pricing: {
      price: 3,
      description: "Good place to start",
    },
    reporting: {
      detailedReporting: false,
      weeklyDataReports: false,
      createReport: true,
    },
    blog: {
      createBlog: true,
      uploadImages: false,
    },
    fileActions: {
      uploadFiles: false,
      shareFiles: true,
      watchVideos: false,
    },
    applicationIntegrations: {
      installNewApps: false,
      installCustomApps: true,
    },
  },
  {
    name: "Advanced",
    pricing: {
      price: 10,
      description: "For the startup with more needs",
    },
    reporting: {
      detailedReporting: true,
      weeklyDataReports: true,
      createReport: true,
    },
    blog: {
      createBlog: true,
      uploadImages: false,
    },
    fileActions: {
      uploadFiles: true,
      shareFiles: true,
      watchVideos: false,
    },
    applicationIntegrations: {
      installNewApps: true,
      installCustomApps: false,
    },
  },
  {
    name: "Enterprise",
    pricing: {
      price: 100,
      description: "For big companies with big dreams",
    },
    reporting: {
      detailedReporting: true,
      weeklyDataReports: true,
      createReport: true,
    },
    blog: {
      createBlog: true,
      uploadImages: true,
    },
    fileActions: {
      uploadFiles: true,
      shareFiles: true,
      watchVideos: false,
    },
    applicationIntegrations: {
      installNewApps: true,
      installCustomApps: false,
    },
  },
];
