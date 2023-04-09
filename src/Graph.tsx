import { PerspectiveViewerElement } from '@finos/perspective-viewer';
import '@finos/perspective-viewer-d3fc';
import React from 'react';

class Graph extends PerspectiveViewerElement(HTMLElement) {
  componentDidMount() {
    const elem = document.getElementsByTagName('perspective-viewer-d3fc')[0];
    elem.addEventListener('perspective-click', this.onClick);
  }

  onClick(event: any) {
    console.log(event.detail);
  }
}

export default Graph;
