import Aurelia, { RouterConfiguration, StyleConfiguration } from 'aurelia';
import { MyApp } from './my-app';
import * as pages from './pages/pages'
import * as components from './components/components'
// Css files imported in this main file are NOT processed by style-loader
// They are for sharedStyles in shadowDOM.
// However, css files imported in other js/ts files are processed by style-loader.
import shared from './styles/shared.scss';

const styleConfiguration = StyleConfiguration.shadowDOM({
  // optionally add the shared styles for all components
  sharedStyles: [shared]
});

Aurelia
  
  .register(
    pages,
    components,
    styleConfiguration,
    RouterConfiguration
  )
  
  .app(MyApp)
  .start();
 