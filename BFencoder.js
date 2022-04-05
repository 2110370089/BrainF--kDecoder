function BFdecoder(G){
  G=G.replace(/[^+-<>[\].]/g,''); //指定文字以外削除
  const W=G.length; //コードの長さをWに代入
  let L=[0],T=0,B=0,D='',I,F=()=>{
    switch(G[I]){
      case '[':
        B++;
        break;
      case ']':
        B--;
    }
  };
  for(I=0;I<W;I++){
    switch(G[I]){
      case '+':
        L[T]++;
        break;
      case '-':
        L[T]--;
        break;
      case '>':
        T++;
        if(L[T]==undefined)
          L.push(0);
        break;
      case '<':
        T--;
        break;
      case '[':
        if(L[T]==0){
          B++;
          while(B>0){
            I++;
            F();
          }
        }
        break;
      case ']':
        B--;
        while(B<0){
          I--;
          F();
        }
        I--;
        break;
      case '.':
        D+='%'+L[T].toString(16);
    }
    L[T]=L[T]<0?L[T]+256:L[T]%256;
  }
  return decodeURI(D);
}
