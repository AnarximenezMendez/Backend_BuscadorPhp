$(function(){
  var Propiedades = {
    estructura: $('#bienes'),
    formulario: $('#formulario'),
    $btnTodos: $('#mostrarTodos'),

    Init: function(){
      var self = this
      self.seleccionarPropiedad()
      self.seleccionarTodas()
      self.formulario.submit(function(e){
        e.preventDefault()
        self.buscarPropiedades()
      })
    },
    seleccionarPropiedad: function(){
      $('select').material_select()
    },
    buscarPropiedades: function(e){
      var self = this
      var ciudad = $('form').find('select[id="selectCiudad"]').val()
      var tipo = $('form').find('select[id="selectTipo"]').val()
      var from = self.cifra($('.irs-from').text())
      var to = self.cifra($('.irs-to').text())

      var datos = {ciudad: ciudad, tipo: tipo, from: from, to: to}
      self.ajaxData(datos)
    },
    seleccionarTodas: function(){
      var self = this
      self.$btnTodos.on('click', (e)=>{
        var datos = {todos: ""}
        self.ajaxData(datos)
      })
    },
    ajaxData: function(datos){
      var self = this
      $.ajax({
        url: 'buscador.php',
        type: 'POST',
        data: datos
      }).done(function(data){
        var newData = JSON.parse(data)
        self.verPropiedades(newData)
      })
    },
    cifra: function(num){
      var numero = num
      var newNumero = Number(numero.replace('$', '').replace(',', '').replace(' ', ''))
      return newNumero
    },
    verPropiedades: function(propiedades){
      var self = this
      var bien = propiedades
      self.estructura.html('')

      bien.map((bien)=>{
        var bienTemplate = '<div class="itemMostrado card horizontal ">'+
                              '<div class="col s6">'+
                                '<img src="img/home.jpg">'+
                              '</div>'+
                              '<div class="col s6">'+
                              '<div class="card-stacked">'+
                                '<div class="card-content">'+
                                  '<div>'+
                                    '<b>Direccion: </b>:direccion:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Ciudad: </b>:ciudad:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Telefono: </b>:telefono:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Código postal: </b>:codigo_postal:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Precio: </b>:precio:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Tipo: </b>:tipo:<p></p>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="card-action right-align">'+
                                  '<a href="#">Ver más</a>'+
                                '</div>'+
                              '</div>'+
                            '</div>'+
                            '</div>';

        var newBien = bienTemplate.replace(':direccion:', bien.Direccion)
                                  .replace(':ciudad:', bien.Ciudad)
                                  .replace(':telefono:', bien.Telefono)
                                  .replace(':codigo_postal:', bien.Codigo_Postal)
                                  .replace(':precio:', bien.Precio)
                                  .replace(':tipo:', bien.Tipo)
        self.estructura.append(newBien)
      })
    }
  }
  Propiedades.Init()
})
