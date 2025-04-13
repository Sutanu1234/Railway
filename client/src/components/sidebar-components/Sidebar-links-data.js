import {
    Crown,
    House,
    LifeBuoy,
    Send,
    Settings2,
    TrainFront,
    UserRound,
  } from "lucide-react"

export const data = {
    user: {
      name: "Sutanu Bera",
      email: "sutanubera82@example.com",
      avatar: "https://github.com/shadcn.png",
    },
    navTop : {
        logo: TrainFront,
        boldText: "Indian Railway",
        smallText: "Reservation"
    },
    navMain: [
      {
        title: "Home",
        url: "/user-home",
        icon: House,
        isActive: true,
        items: [
          {
            title: "Book Tickets",
            url: "/user-trainhome",
          },
          {
            title: "Show Tickets",
            url: "/user-showtickets",
          },
        ],
      },
      {
        title: "Employee",
        url: "/emp-home",
        icon: UserRound,
        items: [
          {
            title: "Home",
            url: "/emp-home",
          },
          {
            title: "Check Tickets",
            url: "/emp-checktickets",
          },
          // {
          //   title: "Quantum",
          //   url: "#",
          // },
        ],
      },
      {
        title: "Admin Page",
        url: "/admin-home",
        icon: Crown,
        items: [
          {
            title: "Add Train",
            url: "/admin-addtrainform",
          },
          {
            title: "Add Station",
            url: "/admin-stationform",
          },
          {
            title: "All Trains",
            url: "/admin-trainpage",
          },
          {
            title: "Assign Employees",
            url: "/admin-addwork",
          },
          // {
          //   title: "Changelog",
          //   url: "#",
          // },
        ],
      }
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ]
  }