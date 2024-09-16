import 'dart:developer';

import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketClient {
  IO.Socket? socket;
  static SocketClient? _instance;

  SocketClient._internal() {
    socket = IO.io('http://192.168.1.67:3000',
        IO.OptionBuilder().setTransports(['websocket']).build());

    socket!.connect();
    socket!.onConnect((_) {
      log("Socket Connected: ${socket!.connected}");
      log('Connection established');
    });
  }

  static SocketClient? get instance {
    _instance ??= SocketClient._internal();
    return _instance;
  }
}
