import { useRegisterSW } from "virtual:pwa-register/preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface InstallPrompt extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function usePwa() {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [updateDismissed, setUpdateDismissed] = useState(false);
  const reloadRequested = useRef(false);
  const activatedUpdate = useRef(false);
  const [offline, setOffline] = useState(!navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState<InstallPrompt | null>(null);
  const [installed, setInstalled] = useState(
    () =>
      matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true,
  );
  const supported = "serviceWorker" in navigator;
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    onNeedReload: () => {
      activatedUpdate.current = true;
      if (reloadRequested.current) window.location.reload();
      else setNeedRefresh(true);
    },
    onOfflineReady: () => {
      setReady(true);
      setFailed(false);
    },
    onRegisteredSW: (_url, registration) => {
      if (registration?.active) setReady(true);
    },
    onRegisterError: () => setFailed(true),
  });

  useEffect(() => {
    const onConnection = () => setOffline(!navigator.onLine);
    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPrompt);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };
    window.addEventListener("online", onConnection);
    window.addEventListener("offline", onConnection);
    window.addEventListener("beforeinstallprompt", onInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("online", onConnection);
      window.removeEventListener("offline", onConnection);
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) return;
    try {
      await installPrompt.prompt();
      await installPrompt.userChoice;
    } finally {
      setInstallPrompt(null);
    }
  };

  const update = async () => {
    setUpdating(true);
    setUpdateError(false);
    reloadRequested.current = true;
    try {
      if (activatedUpdate.current) window.location.reload();
      else await updateServiceWorker();
    } catch {
      reloadRequested.current = false;
      setUpdateError(true);
    } finally {
      setUpdating(false);
    }
  };

  const status = ready
    ? offline
      ? "现在离线，诗集依然在这里。"
      : "整本诗集已备好，断网也能读。"
    : !supported
      ? "这个浏览器暂不支持离线保存，联网时仍可读诗。"
      : failed
        ? "离线保存未完成，请联网后重新打开。"
        : offline
          ? "当前离线，请联网打开一次，保存完整诗集。"
          : "正在把诗集轻轻放进这台设备……";

  return {
    ready,
    failed,
    offline,
    installed,
    canInstall: Boolean(installPrompt),
    install,
    status,
    needRefresh,
    updating,
    updateError,
    update,
    updateDismissed,
    dismissUpdate: () => setUpdateDismissed(true),
  };
}

export type Pwa = ReturnType<typeof usePwa>;
