function Decoder(bytes, port) {

  tempC = (bytesToFloat(bytes.slice(0, 4))).toFixed(2);
  
  humidity = (bytesToFloat(bytes.slice(4, 8))).toFixed(2);
  
  return {
    temperature:
      tempC,
    humidity:
      humidity,
    batteryVoltage:
      (((bytes[8])*0.2)/10).toFixed(2),
    batteryLevel:
      (bytes[9]),
    doorOpen:
      ((bytes[10]) !== 0) ? true : false,    
    
  };
}

  function bytesToFloat(bytes) {
    //LSB Format (least significant byte first).
    var bits = bytes[3]<<24 | bytes[2]<<16 | bytes[1]<<8 | bytes[0];
    var sign = (bits>>>31 === 0) ? 1.0 : -1.0;
    var e = bits>>>23 & 0xff;
    var m = (e === 0) ? (bits & 0x7fffff)<<1 : (bits & 0x7fffff) | 0x800000;
    var f = sign * m * Math.pow(2, e - 150);
    return f;
  }
