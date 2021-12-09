## how to 
### pack windows
npm run build
npm run pack-only
### pack android
npm run build
cd app\
npx cap sync
npx cap open android
### run android
npm run build
cd app\

npx cap sync
npx cap run android --stacktrace

## known bugs
