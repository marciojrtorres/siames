function siames(request, sender, sendResponse) {
  let text = request.text;
  var iframe = document.querySelector('#frame_aplicacao');

  if (iframe === null) return;

  let trimQuotationMarks = function(s) {
    if (s.charAt(0) === '"' && s.charAt(s.length - 1) === '"')
      return s.substring(1, s.length - 1); // trim quotation marks

    return s;
  };

  let aulas = [];
  let split = text.split('\n');
  split.forEach(function(line) {  //               <|15
    if (line.length < 15) return; // 1;02/03/2017;Atividade da aula
    let separator = line.trim().charAt(1);
    let regex = new RegExp("(.{1})\\" +
                separator + "+(\\d{2}\\/\\d{2}\\/\\d{4})\\" +
                separator + "+(.*)");
    let columns = regex.exec(line);
    let aula = {
      etapa: columns[1],
      data: columns[2],
      atividade: trimQuotationMarks(columns[3])
      // some spreadsheets apps export string
      // columns with quotation marks like google drive spreadsheet
    };
    aulas.push(aula);
  });

  let content = iframe.contentDocument;

  let etapas = content.querySelectorAll('select[name="cd_etapa[]"');
  etapas.forEach((etapa, i) =>
    etapa.value = i < aulas.length ? aulas[i].etapa : '');

  let datas = content.querySelectorAll('input[name="dt_prevista[]"]');
  datas.forEach((data, i) =>
    data.value = i < aulas.length ? aulas[i].data : '');

  let atividades = content.querySelectorAll('input[name="ds_atividade[]"]');
  atividades.forEach((atividade, i) =>
    atividade.value = i < aulas.length ? aulas[i].atividade : '');

}

browser.runtime.onMessage.addListener(siames);
