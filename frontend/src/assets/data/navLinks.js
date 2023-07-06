const brandLinks = [
    {
      childPath: "/admin/brands/new",
      childDisplay: "Add Brand",
    },
    {
      childPath: "/admin/brands",
      childDisplay: "Manage Brands",
    }
  ]
  
  const vehicleLinks = [
    {
      childPath: "/admin/vehicles/new",
      childDisplay: "Add Vehicle",
    },
    {
      childPath: "/admin/vehicles",
      childDisplay: "Manage Vehicles",
    },
  ]
  
  const navLinks = [
    {
      path: "/admin/dashboard",
      display: "Dashboard",
      hasChild: false,
      child: [],
    },
    {
      path: "/admin/brands",
      display: "Brands",
      hasChild: true,
      child: brandLinks,
    },
    {
      path: "/admin/vehicles",
      display: "Vehicles",
      hasChild: true,
      child: vehicleLinks,
    },
    // {
    //   path: "/admin/manage-query",
    //   display: "Manage Query",
    //   hasChild: false,
    //   child: [],
    // },
    // {
    //   path: "/admin/manage-pages",
    //   display: "Manage Pages",
    //   hasChild: false,
    //   child: [],
    // },
    // {
    //   path: "/admin/contact-info",
    //   display: "Update Contact Info",
    //   hasChild: false,
    //   child: [],
    // },
    // {
    //   path: "/admin/password/edit",
    //   display: "Change Admin Password",
    //   hasChild: false,
    //   child: [],
    // },
  ];


  export default navLinks;