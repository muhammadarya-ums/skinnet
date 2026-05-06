// helpers/bluetooth.ts

export const SKINNET_UUIDS = {
  // UUID yang baru saja kamu generate
  SERVICE: "6f3379dd-08d1-4fb5-93c8-b24fc058244f",
  CHARACTERISTIC: "94f1f530-5737-4201-840f-7dcc2ef223ec"
};

export async function connectBluetooth() {
  try {
    // 1. Request perangkat dengan filter nama (sesuaikan dengan nama di ESP32)
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'SkinNet' }], 
      optionalServices: [SKINNET_UUIDS.SERVICE]
    });

    // 2. Hubungkan ke GATT Server
    const server = await device.gatt?.connect();
    
    // 3. Dapatkan Service
    const service = await server?.getPrimaryService(SKINNET_UUIDS.SERVICE);
    
    // 4. Dapatkan Characteristic
    const characteristic = await service?.getCharacteristic(SKINNET_UUIDS.CHARACTERISTIC);

    console.log("Terhubung ke SkinNET Bio!");
    return characteristic;
  } catch (error) {
    console.error("Koneksi Bluetooth Gagal:", error);
    return null;
  }
}