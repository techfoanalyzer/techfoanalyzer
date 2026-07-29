import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      isHydrated: false, // 🚀 1. Hydration status store me add kiya

      setUser: (payload) =>
        set({
          isLoggedIn: true,
          user: payload,
        }),

      removeUser: () =>
        set({
          isLoggedIn: false,
          user: null,
        }),

      // 🚀 2. Hydration state ko toggle karne ke liye function
      setHasHydrated: (state) => set({ isHydrated: state }),
    }),
    {
      name: "user-storage",
      // 🚀 3. Jaise hi LocalStorage se data load hoga, ye chal parega
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },
    }
  )
);



// use-----------------

// "use client";

// import { useUserStore } from "@/store/userStore";

// export default function Navbar() {
//   const { user, isLoggedIn, removeUser,setUser ,isHydrated } = useUserStore();

//   return (
//     <div>
//       {isLoggedIn ? user.name : "Guest"}
//       <button onClick={removeUser}>Logout</button>
//     </div>
//   );
// }