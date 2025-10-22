import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'pinch-zoom': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
