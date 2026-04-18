"use client"

import { useState } from "react";

// Perbaikan Error 2304: Menambahkan interface agar TS kenal BluetoothDevice
declare global {
  interface Navigator {
    bluetooth: any;
  }
  // Definisikan BluetoothDevice agar tidak "Cannot find name"
  interface BluetoothDevice {
    gatt?: {
      connect(): Promise<any>;
      connected: boolean;
      disconnect(): void;
    };
    name?: string;
    id: string;
  }
}

export function useBluetooth() {
  const [isScanning, setIsScanning] = useState(false);
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [receivedData, setReceivedData] = useState<string>("");

  const connectBluetooth = async () => {
    try {
      setIsScanning(true);

      if (!navigator.bluetooth) {
        alert("Browser ini tidak mendukung Web Bluetooth. Gunakan Chrome atau Edge!");
        return;
      }

      // 1. Cari perangkat
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: "SkinNet-Bio" }],
        optionalServices: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"]
      });

      // 2. Hubungkan ke Server GATT
      const server = await device.gatt?.connect();
      
      // 3. Ambil Service & Characteristic
      const service = await server?.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b");
      const characteristic = await service?.getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8");

      // 4. Aktifkan Notifikasi
      await characteristic?.startNotifications();
      
      characteristic?.addEventListener('characteristicvaluechanged', (event: any) => {
        const value = new TextDecoder().decode(event.target.value);
        setReceivedData(value);
      });

      setDevice(device);
      console.log("✅ Terhubung ke SkinNet-Bio");
    } catch (error) {
      console.error("❌ Gagal koneksi:", error);
    } finally {
      setIsScanning(false);
    }
  };

  const disconnectBluetooth = () => {
    if (device && device.gatt?.connected) {
      device.gatt.disconnect();
      setDevice(null);
      setReceivedData("");
      console.log("❌ Bluetooth Disconnected");
    }
  };

  return { connectBluetooth, disconnectBluetooth, receivedData, isScanning, device };
} // Pastikan kurung ini ada buat nutup fungsi useBluetooth