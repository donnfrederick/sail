export interface ConnectionOptions {
  audio: boolean
  audioCodecType?: string
  audioBitRate?: number
  video: boolean
  videoCodecType?: string
  videoBitRate?: number
  multistream?: boolean
  spotlight?: number
}

export interface SoraObject {
  channelId: string
  metadata: string
  options: ConnectionOptions
  signalingUrl: string
  constraints: {
    audio?: object
    video?: object
    optional?: any
  }
  debug: boolean
  clientId: string
  remoteClientIds: string[]
  stream: MediaStream
  role: string
  authMetadata: string
  _ws: WebSocket
  _pc: RTCPeerConnection
  connect: (stream: MediaStream) => Promise<MediaStream>
  disconnect: () => Promise<void>
  on: (kind: SoraEvents, callback: any) => void
}

export type SoraEvents =
  | 'disconnect'
  | 'push'
  | 'addstream'
  | 'removestream'
  | 'notify'
  | 'log'

export interface SoraConnection {
  publisher: (
    channelId: string,
    metadata: string,
    options?: ConnectionOptions
  ) => SoraObject
  subscriber: (
    channelId: string,
    metadata: string,
    options?: ConnectionOptions
  ) => SoraObject
}

export declare const Sora: {
  connection: (url: string, debug?: boolean) => SoraConnection
}
