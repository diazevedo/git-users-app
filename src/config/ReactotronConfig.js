import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  // {host: IP da maquina}
  // redirecionar as portas // ver os negocios do reverse
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();
  console.tron = tron.log;
  tron.clear();
}
