$(document).on('ready', function(){

$('#formLocalidades').on('submit', function(e){
				e.preventDefault();

				var localidad = {
					id:      $('#id').val(),
					nombre : $('#nombre').val(),
				    };

				$.ajax({
					type : 'POST',
					url : App.Helpers.urlBase + '/admin/localidad',
					data: localidad,
					dataType: 'json',
					success: function(localidad){
						console.log(localidad);

						var info = $('.info');

						info.hide().empty();

						if(!localidad.success){
							info.append('<li>'+ $(localidad.errors).toArray()[0] +'</li>');
							info.slideDown();	
						}else{
							info.find('ul').append('<li>Agregado correctamente</li>');
							info.slideDown();

							localidad.localidad.urlEdit = App.Helpers.urlBase + '/users/admin/'+ localidad.localidad.id; 

							var template=$('#filaLocalidad-template').html();
							Mustache.parse(template);
							var render = Mustache.render(template,localidad.localidad);
							$('#tablaLocalidad').prepend(render);
							$('#id').val('');
							$('#nombre').val('');
							$('#formLocalidades').slideUp();
					     }
					 },
					error:function (error){
					}
				});

			});
					

				$("#oculta").on('click',function(e){
					e.preventDefault();
					$('#formLocalidades').slideDown('fast');
					$('#oculta').hide();
				});

			$('#cancela').on('click',function(e){
				e.preventDefault();
				$('#formLocalidades').hide('fast');
				$('#oculta').slideDown('fast');
			});

			


				$('#tablaLocalidad').on('click', '.elimina', function(e){
						e.preventDefault();

						var id = $(this).attr('data-id'),
							rowUser = $(this),
							respuesta = confirm('Realmente decea eliminar la localidad');

							if( respuesta ){
								$.ajax({
									type:'GET',
									url: App.Helpers.urlBase +'/admin/localidad/'+id+'/eliminar',
									data : {},
									dataType:'json',
									success:function(data){
										rowUser.closest('tr').remove();
									},
									error: function(error){

									}
								});
							}
					   });
				});