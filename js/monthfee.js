window.onload = function(){
	document.getElementById("done").onclick = function(){
		//AWS費用は初期値47740入力済み
		var aws = eval(document.getElementById("aws").value);
		//利用ユーザ数
		var usr = eval(document.getElementById("usr").value);
		//１ユーザの１週間での使用授業時間数
		var lesson = eval(document.getElementById("lesson").value);
		//トラフィック費用：17円／GBとして計算
		//ユーザ数×１ヶ月の授業時間×１授業あたり75kb／１GB×17円
		//75kb＝授業保存15kb〜呼び出し〜修正保存〜プリント作成〜保存
		var packy = ((usr * (lesson * 4.35)) * (75 / 1000000) * 17);
		//１授業時間あたりの利用単語数（画像検索回数）
		var pict = eval(document.getElementById("pict").value);
		//1000トランザクションあたり448円
		var stran = pict * 448 / 1000;
		//無料トランザクション数（３０００）
		var ftran = 3000;
		//無料分を削除するための変数（費用換算）
		var freepict = (448 / 1000) * ftran;
		//ユーザ数×１ヶ月の授業時間×トランザクション費ー無料分
		var tran = ((usr * (lesson * 4.35)) * stran) - freepict;
		//Google Speech-to-Text分
		//時間計算１授業時間45分＝2700 秒→バッファ（15秒刻みで重複の発生もあるだろう）3000秒の１月分
		var sttB = (lesson * 3000 * 4.35 );
		var sttY = (usr * (sttB - 3600) / 15 * 0.6);
		//想定ランニングコスト
		var rf = aws + packy + tran + sttY;
		//小数点以下切り捨て
		var result = Math.floor(rf);
		//AWS分
		var sv = aws + packy;
		var svresult = Math.floor(sv);
		//画像検索分
		var ga = tran;
		var garesult = Math.floor(ga);
		//Google Speech-to-Text分
		var stgl = sttY;
		var stgresult = Math.floor(stgl);
		
		document.getElementById("cost").innerHTML = "約" + result + "円";
		document.getElementById("ycost").innerHTML = "内訳";
		document.getElementById("svcost").innerHTML = "AWS：約" + svresult + "円";
		document.getElementById("gacost").innerHTML = "画像検索：約" + garesult + "円";
		document.getElementById("stgcost").innerHTML = "Google 音声認識：約" + stgresult + "円";
				
		//ユーザ１人当たりの月額費用
		//想定ランニングコスト／ユーザ数
		var mf = rf / usr;
		var mfee = Math.floor(mf);
		document.getElementById("monthfee").innerHTML = "月額費用：約" + mfee + "円 ／ 人";		
		//ユーザ１人当たりの年間費用
		//ユーザ１人当たりの月額費用×12
		var yf = mf * 12;
		var yfee = Math.floor(yf);
		document.getElementById("yearfee").innerHTML = "年額費用：約" + yfee + "円 ／ 人";		
		//お薦め年間利用料
		//ユーザ１人当たりの年間費用×１.５
		var fe = yf * 1.5;
		var fee = Math.floor(fe);
		document.getElementById("fee").innerHTML = "お薦め年間利用料：" + fee + "円";	
		//利益
		//（お薦め年間利用料ーユーザ１人当たりの年間費用）×ユーザ数
		var vene = (fee - yfee) * usr;
		document.getElementById("venefit").innerHTML = "ランニングコストに対する利益：" + vene + "円";	
	}
}
