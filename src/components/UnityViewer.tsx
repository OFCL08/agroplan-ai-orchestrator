import { useEffect } from 'react';

interface UnityConfig {
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
  loaderUrl: string;
  streamingAssetsUrl: string;
  companyName: string;
  productName: string;
  productVersion: string;
}

interface UnityInstance {
  Quit: () => void;
  SetFullscreen: (fullscreen: boolean) => void;
}

declare global {
  interface Window {
    createUnityInstance: (
      canvas: HTMLCanvasElement,
      config: UnityConfig,
      onProgress?: (progress: number) => void
    ) => Promise<UnityInstance>;
    unityInstance: UnityInstance | null;
  }
}

const UnityViewer = () => {
  useEffect(() => {
    const loadUnity = async () => {
      const container = document.querySelector("#unity-container") as HTMLDivElement;
      const canvas = document.querySelector("#unity-canvas") as HTMLCanvasElement;
      const loadingBar = document.querySelector("#unity-loading-bar") as HTMLDivElement;
      const progressBarFull = document.querySelector("#unity-progress-bar-full") as HTMLDivElement;
      const warningBanner = document.querySelector("#unity-warning") as HTMLDivElement;

      const config: UnityConfig = {
        dataUrl: "/Build/agri.data.br",
        frameworkUrl: "/Build/agri.framework.js.br",
        codeUrl: "/Build/agri.wasm.br",
        loaderUrl: "/Build/agri.loader.js",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "AgroPlan",
        productName: "Farm Visualization",
        productVersion: "1.0",
      };

      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        container?.classList.add("unity-mobile");
      }

      // Show a loading bar while loading
      loadingBar?.classList.remove("hidden");

      try {
        const unityInstance = await window.createUnityInstance(canvas, config, (progress: number) => {
          if (progressBarFull) {
            progressBarFull.style.width = `${100 * progress}%`;
          }
        });
        
        window.unityInstance = unityInstance;
        loadingBar?.classList.add("hidden");
      } catch (error) {
        console.error('Unity initialization error:', error);
        if (warningBanner) {
          warningBanner.style.display = "block";
          warningBanner.textContent = error instanceof Error ? error.message : 'Unknown error';
        }
      }
    };

    loadUnity();

    // Cleanup function
    return () => {
      if (window.unityInstance) {
        window.unityInstance.Quit();
        window.unityInstance = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] bg-black rounded-3xl overflow-hidden">
      <div id="unity-container" className="w-full h-full">
        <canvas 
          id="unity-canvas" 
          className="w-full h-full bg-black"
          style={{ width: '100%', height: '100%' }}
        ></canvas>
        <div id="unity-loading-bar" className="hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div id="unity-progress-bar-full" className="h-full w-0 bg-emerald-500 transition-all duration-300"></div>
            </div>
          </div>
        </div>
        <div id="unity-warning" className="hidden absolute top-0 left-0 right-0 p-4 bg-red-500 text-white text-center"></div>
      </div>
    </div>
  );
};

export default UnityViewer; 