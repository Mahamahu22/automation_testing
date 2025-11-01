import { setWorldConstructor } from "@cucumber/cucumber";

class CustomWorld {
  page: any;
  browser: any;
}

setWorldConstructor(CustomWorld);
