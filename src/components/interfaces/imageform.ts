export interface imageform {
    src: string;
    srcName:string;
    width: number;
    height: number;
    country: string;
    subregion: string;
    caption: string;
    message: string;
    messageType: 'success' | 'error' | '';
  }