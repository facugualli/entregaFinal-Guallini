const btnFinalizar = document.querySelector(`#finalizarCompra`);
const usuario = {
    mailUsuario: ``,
    numeroTarjeta: ``,
    numeroSeguridad: ``
};

btnFinalizar.addEventListener(`click`, async () => {
    const step1 = await Swal.fire({
        title: `Ingrese su mail para recibir las instrucciones de descarga`,
        text: `Ingrese su mail`,
        input: `email`,
        inputPlaceholder: `Correo electrónico`,
        confirmButtonText: `Siguiente`,
        showCancelButton: true,
        confirmButtonColor: '#006ec1',
        cancelButtonColor: '#525252',
        customClass: {
            title: 'my-custom-title',
            container: 'my-custom-content',
            input: 'my-custom-input',
            actions: 'my-custom-actions',
        }
    });

    if (step1.isConfirmed) {
        usuario.mailUsuario = step1.value;

        const step2 = await Swal.fire({
            title: `Ya casi terminamos..`,
            text: `El total de tu compra es de $${total}`,
            text: `Ingresa los datos de tu tarjeta`,
            input: `text`,
            inputPlaceholder: `Nombre del titular`,
            confirmButtonText: `Siguiente`,
            showCancelButton: true,
            confirmButtonColor: '#006ec1',
            cancelButtonColor: '#525252',
            customClass: {
                title: 'my-custom-title',
                container: 'my-custom-content',
                input: 'my-custom-input',
                actions: 'my-custom-actions',
            }
        });

        if (step2.isConfirmed) {
            usuario.nombreTitular = step2.value;

            const step3 = await Swal.fire({
                title: `Ingresa los datos de tu tarjeta`,
                input: `number`,
                inputPlaceholder: `Numero de tarjeta`,
                confirmButtonText: `Siguiente`,
                showCancelButton: true,
                confirmButtonColor: '#006ec1',
                cancelButtonColor: '#525252',
                customClass: {
                    title: 'my-custom-title',
                    container: 'my-custom-content',
                    input: 'my-custom-input',
                    actions: 'my-custom-actions',
                }
            });

            if (step3.isConfirmed) {
                if (isValidCreditCardNumber(step3.value)) {
                    usuario.numeroTarjeta = step3.value;

                    const step4 = await Swal.fire({
                        title: `Ingresa los datos de tu tarjeta`,
                        input: `number`,
                        inputPlaceholder: `Codigo de seguridad`,
                        confirmButtonText: `Siguiente`,
                        showCancelButton: true,
                        confirmButtonColor: '#006ec1',
                        cancelButtonColor: '#525252',
                        customClass: {
                            title: 'my-custom-title',
                            container: 'my-custom-content',
                            input: 'my-custom-input',
                            actions: 'my-custom-actions',
                        }
                    });

                    if (step4.isConfirmed) {
                        if (isValidSecurityCode(step4.value)) {
                            usuario.numeroSeguridad = step4.value;

                            const resumen = await Swal.fire({
                                title: `Por favor, confirme los datos ingresados:`,
                                html: `Mail: ${usuario.mailUsuario}<br>Nombre del titular: ${usuario.nombreTitular}<br>Número de tarjeta: ${usuario.numeroTarjeta}<br>Código de seguridad: ${usuario.numeroSeguridad}`,
                                showCancelButton: true,
                                confirmButtonText: `Confirmar`,
                                cancelButtonText: `Rechazar`,
                                confirmButtonColor: '#006ec1',
                                cancelButtonColor: '#525252',
                                customClass: {
                                    title: 'my-custom-title',
                                    container: 'my-custom-content',
                                    input: 'my-custom-input',
                                    actions: 'my-custom-actions',
                                }
                            });

                            if (resumen.isConfirmed) {
                                Swal.fire({
                                    title: `Tu compra se ha realizado con éxito!`,
                                    icon: `success`,
                                    text: `Muchas gracias ${usuario.nombreTitular}!`,
                                    confirmButtonColor: '#006ec1',
                                    cancelButtonColor: '#525252',
                                    customClass: {
                                        title: 'my-custom-title',
                                        container: 'my-custom-content',
                                        input: 'my-custom-input',
                                        actions: 'my-custom-actions',
                                    }
                                });
                            } else {
                                Swal.fire({
                                    title: `Compra cancelada`,
                                    icon: `error`,
                                    text: `Tu compra ha sido cancelada`,
                                    confirmButtonColor: '#006ec1',
                                    cancelButtonColor: '#525252',
                                    customClass: {
                                        title: 'my-custom-title',
                                        container: 'my-custom-content',
                                        input: 'my-custom-input',
                                        actions: 'my-custom-actions',
                                    }
                                });
                            }
                        } else {
                            Swal.fire({
                                title: `Error`,
                                icon: `error`,
                                text: `Código de seguridad incorrecto`,
                                confirmButtonColor: '#006ec1',
                                cancelButtonColor: '#525252',
                                customClass: {
                                    title: 'my-custom-title',
                                    container: 'my-custom-content',
                                    input: 'my-custom-input',
                                    actions: 'my-custom-actions',
                                }
                            });
                        }
                    }
                } else {
                    Swal.fire({
                        title: `Error`,
                        icon: `error`,
                        text: `Número de tarjeta incorrecto`,
                    });
                }
                
            }
        }
    }
    limpiarTotal();
    limpiarCarrito();
});

function isValidCreditCardNumber(number) {
    const cleanedNumber = number.replace(/[-\s]+/g, ``);
    return /^\d{16}$/.test(cleanedNumber);
};

function isValidSecurityCode(code) {
    return /^\d{3,4}$/.test(code);
};






