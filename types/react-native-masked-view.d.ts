declare module '@react-native-masked-view/masked-view' {
  import { ComponentType, ReactElement } from 'react';
    import { ViewProps } from 'react-native';

  export interface MaskedViewProps extends ViewProps {
    /** The element used as the mask (the opaque parts of this element will reveal children) */
    maskElement?: ReactElement | null;
    children?: ReactElement | ReactElement[] | null;
  }

  const MaskedView: ComponentType<MaskedViewProps>;
  export default MaskedView;
}
