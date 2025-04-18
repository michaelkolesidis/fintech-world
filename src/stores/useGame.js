import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(
  subscribeWithSelector((set) => {
    return {
      /**
       * Player position
       */
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      /**
       * Set player position
       */
      setPosition: (x, y, z) => {
        set(() => {
          return {
            positionX: x,
            positionY: y,
            positionZ: z,
          };
        });
      },
      /**
       * Player proximity to NPC
       */
      isNearNpc: false,
      toggleIsNearNpc: () => {
        set((state) => {
          if (state.isNearNpc === true) {
            return { isNearNpc: false };
          }
          if (state.isNearNpc === false) {
            return { isNearNpc: true };
          }
          return {};
        });
      },
      /**
       * Player proximity to Arcade
       */
      isNearArcade: false,
      toggleIsNearArcade: () => {
        set((state) => {
          if (state.isNearArcade === true) {
            return { isNearArcade: false };
          }
          if (state.isNearArcade === false) {
            return { isNearArcade: true };
          }
          return {};
        });
      },
      /**
       * Chatting with NPC
       */
      isChatting: false,
      toggleIsChatting: () => {
        set((state) => {
          if (state.isChatting === true) {
            return { isChatting: false };
          }
          if (state.isChatting === false) {
            return { isChatting: true };
          }
          return {};
        });
      },
      /**
       * Instructions
       */
      instructionsShown: true,
      hideInstructions: () => {
        set(() => {
          return { instructionsShown: false };
        });
      },
      /**
       * Sound
       */
      sound: false,
      toggleSound: () => {
        set((state) => {
          if (state.sound === true) {
            return { sound: false };
          }
          if (state.sound === false) {
            return { sound: true };
          }
          return {};
        });
      },
      playing: false,
      togglePlaying: () => {
        set((state) => {
          if (state.playing === true) {
            return { playing: false };
          }
          if (state.playing === false) {
            return { playing: true };
          }
          return {};
        });
      },
      /**
       * Phone mode
       */
      phone: false,
      togglePhone: () => {
        set((state) => {
          if (state.phone === true) {
            return { phone: false };
          }
          if (state.phone === false) {
            return { phone: true };
          }
          return {};
        });
      },
      /**
       * Phone Screen
       */
      screen: 'home',
      changeScreen: (value) => set({ screen: value }),
      /**
       * QR
       */
      qrScanned: false,
      scanQr: () => {
        set(() => {
          return { qrScanned: true };
        });
      },
    };
  })
);
