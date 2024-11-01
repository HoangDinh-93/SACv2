import { Browser, BrowserContext } from "@playwright/test";
import { chromium } from "@playwright/test";

let usePersistentContext: boolean = false;

type BrowserContextOptions = {
  userDataDir: string;
  executablePath: string;
};

export const setUsePersistentContext = (): void => {
  usePersistentContext = true;
};

export const createBrowserContext = async (
  options: BrowserContextOptions
): Promise<BrowserContext> => {
  const { userDataDir, executablePath } = options;
  if (usePersistentContext) {
    const context = await chromium.launchPersistentContext(userDataDir, {
      executablePath: executablePath,
    });
    return context;
  } else {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    return context;
  }
};
