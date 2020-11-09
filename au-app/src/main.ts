import Aurelia from 'aurelia';
import { App } from './app';
import { NewCollectionButton } from "./components/new-collection-button";
import * as commonComponents from './components/_registry';

Aurelia
.register(NewCollectionButton, commonComponents)
  .app(App)
  .start();
