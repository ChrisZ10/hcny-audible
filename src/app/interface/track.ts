import { HttpDownloadProgressEvent } from '@angular/common/http';

import { Howl } from 'howler';

export interface Track {
  title: string;
  slug: string;
  uri: string;
  sound: Howl;
        
  description?: string;
  author?: string;
  cover?: string;
  tags?: string[];
}