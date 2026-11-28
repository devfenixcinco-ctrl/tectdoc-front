<template>
    <PageLoader 
        :loading="isLoading"
        :minDuration="500"
        messages="Cargando información del producto..."
    >
    </PageLoader>
    <!-- Header -->
    <Header
        :oscuro="true"
    />

    <div
        class="h-[50px] bg-[#FF4338] !mt-[50px] !mr-[33px]
        !flex !flex-row !items-center !justify-start !px-[30px]
        2xl:!ml-[95px] xl:!ml-[34px]
        2xl:w-[1715px] xl:w-[1283px]
        max-[1024px]:!ml-[26px] max-[1024px]:!w-[95%]
        max-[853px]:!ml-[21px]
        max-[768px]:!ml-[19px]
        max-[768px]:!ml-[19px]
        max-[500px]:!ml-[11px]"
    >
        <!-- Nombre del producto -->
        <h1
            v-if="infoProduct.length > 0"
            class="!font-poppins !font-regular !text-[#FFFFFF]
            2xl:!text-[22px]
            xl:!text-[20px]"
        >
            {{ infoProduct[0].fabriName }} | {{ idProduct }}
        </h1>
    </div>  
    
    <!-- Contenedor de la imagen y la informacion del producto - DESKTOP -->
    <div
        class="!flex !flex-row !items-center !justify-center !justify-self-center !py-[50px] !mb-[50px]
        !bg-[#E6E6E6] !rounded-br-[35px] !rounded-bl-[35px]
        2xl:!w-[90%] 2xl:!h-[750px] 2xl:!px-[30px] 2xl:!gap-[30px]
        xl:!w-[95%] xl:!h-[590px] xl:!px-[40px] xl:!gap-[30px]
        max-[1024px]:!hidden"
    >
        <!-- Espacio reservado para las imágenes mientras carga: evita que la
             información se desplace al llegar los datos (CLS) -->
        <div
            v-if="isLoading"
            class="!bg-[#FFFFFF] !rounded-[5px]
            2xl:!w-[735px] 2xl:!h-[680px]
            xl:!w-[683px] xl:!h-[550px]"
        />
        <!-- Imagenes del producto -->
        <ImagenesProductos 
            v-if="cantidadImagenes !== null && cantidadImagenes > 0 && infoProduct.length > 0"
            :imagenPrincipal="ImagenDefault"
            :imagenAlt1="ImagenDefault"
            :imagenAlt2="ImagenDefault"
            :imagenAlt3="ImagenDefault"
            :imagenAlt4="ImagenDefault"
            :cantidadImagenes="cantidadImagenes"
            :imagenes="infoProduct[0].images"
        />

        <!-- Informacion del producto -->
        <div
            class="!flex !flex-col !rounded-[5px] !justify-start
            overflow-hidden
            2xl:!w-[680px] 2xl:!h-[680px] 2xl:!p-[54px]
            xl:!w-[480px] xl:!h-[550px]"
        >
            <div
                class="!flex !flex-row !justify-between !items-center !gap-[10px]
                !w-[100%]"
            >
                <!-- Nombre del producto -->
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    <strong>Marca</strong>
                </h1>
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    {{ infoProduct[0].fabriName }}
                </h1>
            </div>
            <hr
                class="!border-[#666666] !w-[100%] !h-[1px] !my-[5px]"
            >
            <div
                class="!flex !flex-row !justify-between !items-center !gap-[10px]
                !w-[100%]"
            >
                <!-- Número de articulo -->
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    <strong>Número de articulo</strong>
                </h1>
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    {{ infoProduct[0].partNumber }}
                </h1>
            </div>
            <hr
                class="!border-[#666666] !w-[100%] !h-[1px] !my-[5px]"
            >
            <div
                class="!flex !flex-row !justify-between !items-center !gap-[10px]
                !w-[100%]"
            >
                <!-- Group -->
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    <strong>Grupo de productos</strong>
                </h1>
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    {{ infoProduct[0].group }}
                </h1>
            </div>
            <hr
                class="!border-[#666666] !w-[100%] !h-[1px] !my-[5px]"
            >
            <div
                class="!flex !flex-row !justify-between !items-center !gap-[10px]
                !w-[100%]"
            >
                <!-- GTIN/EAN -->
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    <strong>GTIN/EAN</strong>
                </h1>
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    {{ infoProduct[0].gtin }}
                </h1>
            </div>
            <hr
                class="!border-[#666666] !w-[100%] !h-[1px] !my-[5px]"
            >
            <div
                class="!flex !flex-row !justify-between !items-center !gap-[10px]
                !w-[100%]"
            >
                <!-- Unidad por embalaje -->
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    <strong>Unidad por embalaje</strong>
                </h1>
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    {{ infoProduct[0].unitPerEmbalaje }}
                </h1>
            </div>
            <hr
                class="!border-[#666666] !w-[100%] !h-[1px] !my-[5px]"
            >
            <div
                class="!flex !flex-row !justify-between !items-center !gap-[10px]
                !w-[100%]"
            >
                <!-- Cantidad por unidad -->
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    <strong>Cantidad por unidad</strong>
                </h1>
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    {{ infoProduct[0].quantityPerUnit }}
                </h1>
            </div>
            
            <!-- Separador -->
            <v-divider class="!w-full !border-[1px] !border-[#666666] !opacity-100 !my-[20px]"></v-divider>

            <!-- Botones de compra -->
            <div
                class="2xl:!flex 2xl:!flex-row 2xl:!gap-[10px] !mb-[30px]
                xl:!hidden"
            >
                <!-- Seleccionar cantidad -->
                <SelectNumber 
                   :oscuro="true"
                />

                <!-- Boton de agregar al carrito -->
                <ButtonGeneral 
                    variante="outlined"
                    class="!font-poppins !font-medium !text-md !w-[150px]
                    !h-[36px] !rounded-[5px] !normal-case !text-[#FF4338]"
                    :label="$t('buttons.products')"
                />

                <!-- Boton de comprar -->
                <ButtonGeneral 
                    variante="tonal"
                    class="!font-poppins !font-medium !text-md !w-[150px]
                    !h-[36px] !rounded-[5px] !normal-case !bg-[#FF4338] !text-[#FFFFFF]"
                    :label="$t('buttons.buy')"
                />

                <!-- Botones de compartir y guardar -->
                <div
                    class="!flex !flex-row !items-center !gap-[10px] !ml-[5px]"
                >
                    <!-- Boton de compartir -->
                    <LittleButton 
                        icon_line="mdi mdi-share-outline"
                        icon_fill="mdi mdi-share"
                        :selectable="false"
                    />

                    <!-- Boton de guardar -->
                    <LittleButton 
                        icon_line="mdi mdi-cards-heart-outline"
                        icon_fill="mdi mdi-cards-heart"
                        :selectable="true"
                    />
                </div>
            </div>

            <!-- Botones de compra - MOBILE -->
            <div
                class="!flex !flex-row !gap-[10px] !mb-[10px]
                2xl:!hidden"
            >
                <!-- Seleccionar cantidad -->
                <SelectNumber 
                   :oscuro="true"
                />

                <!-- Boton de agregar al carrito -->
                <ButtonGeneral 
                    variante="outlined"
                    class="!font-poppins !font-medium !text-md !w-[200px]
                    !h-[36px] !rounded-[5px] !normal-case !text-[#FF4338]"
                    :label="$t('buttons.products')"
                />
            </div>

            <!-- Botones de compra y compartir - MOBILE -->
            <div
                class="!flex !flex-row !gap-[10px] !mb-[30px]
                2xl:!hidden"
            >
                <!-- Boton de comprar -->
                <ButtonGeneral 
                    variante="tonal"
                    class="!font-poppins !font-medium !text-md !w-[180px]
                    !h-[36px] !rounded-[5px] !normal-case !bg-[#FF4338] !text-[#FFFFFF]"
                    :label="$t('buttons.buy')"
                />

                <!-- Botones de compartir y guardar -->
                <div
                    class="!flex !flex-row !items-center !gap-[10px] !ml-[5px]"
                >
                    <!-- Boton de compartir -->
                    <LittleButton 
                        icon_line="mdi mdi-share-outline"
                        icon_fill="mdi mdi-share"
                        :selectable="false"
                    />

                    <!-- Boton de guardar -->
                    <LittleButton 
                        icon_line="mdi mdi-cards-heart-outline"
                        icon_fill="mdi mdi-cards-heart"
                        :selectable="true"
                    />
                </div>
            </div>

            <h1
                class="!font-poppins !font-bold !mb-[10px]
                2xl:!text-[22px]
                xl:!text-[20px]"
            >
                Criterios de articulo
            </h1>

            <div
                v-if="infoProduct.length > 0"
                v-for="(criteria, index) in infoProduct[0].criteria"
                :key="index"
            >
                <div
                    class="!flex !justify-between !px-[10px]"
                >
                    <p class="!font-poppins !text-[#444444] !text-[15px]">
                        <strong>{{ criteria.criteriaDescription }}</strong>
                    </p>
                    <p class="!font-poppins !text-[#444444] !text-[15px]">
                        {{ criteria.formattedValue }}
                    </p>
                </div>
                <hr
                    class="!border-[#666666] !w-[100%] !h-[1px] !my-[5px]"
                >
            </div>
        </div>
    </div>

    <!-- Contenedor de la imagen y la informacion del producto - TABLET -->
    <div
        class="!flex !flex-col !items-center !justify-start !justify-self-center !py-[50px] !rounded-br-[35px] !rounded-bl-[35px] !bg-[#E6E6E6]
        2xl:!hidden
        xl:!hidden
        max-[1024px]:!w-[95%] max-[1024px]:!h-auto max-[1024px]:!mb-[50px] max-[1024px]:!px-[40px] max-[1024px]:!gap-[15px]
        max-[820px]:!w-[95%] max-[820px]:!h-auto max-[820px]:!mb-[50px] max-[820px]:!px-[40px] max-[820px]:!gap-[15px]
        max-[768px]:!w-[95%] max-[768px]:!h-auto max-[768px]:!mb-[50px] max-[768px]:!px-[40px] max-[768px]:!gap-[15px]
        max-[500px]:!hidden"
    >

        <!-- Imagenes del producto -->
        <ImagenesProductos 
            v-if="cantidadImagenes !== null && cantidadImagenes > 0 && infoProduct.length > 0"
            :imagenPrincipal="ImagenDefault"
            :imagenAlt1="ImagenDefault"
            :imagenAlt2="ImagenDefault"
            :imagenAlt3="ImagenDefault"
            :imagenAlt4="ImagenDefault"
            :cantidadImagenes="cantidadImagenes"
            :imagenes="infoProduct[0].images"
        />

        <!-- Informacion del producto -->
        <div
            class="!flex !flex-row !justify-between !items-center
            !w-[100%] !mt-[30px]"
        >
            <!-- Nombre del producto -->
            <h1
                v-if="infoProduct.length > 0"
                class="!font-poppins !font-regular !px-[10px]
                2xl:!text-[22px]
                xl:!text-[15px]"
            >
                <strong>Marca</strong>
            </h1>
            <h1
                v-if="infoProduct.length > 0"
                class="!font-poppins !font-regular !px-[10px]
                2xl:!text-[22px]
                xl:!text-[15px]"
            >
                {{ infoProduct[0].fabriName }}
            </h1>
        </div>
        <hr
            class="!border-[#666666] !w-[100%] !h-[1px]"
        >
        <div
            class="!flex !flex-row !justify-between !items-center
            !w-[100%]"
        >
            <!-- Número de articulo -->
            <h1
                v-if="infoProduct.length > 0"
                class="!font-poppins !font-regular !px-[10px]
                2xl:!text-[22px]
                xl:!text-[15px]"
            >
                <strong>Número de articulo</strong>
            </h1>
            <h1
                v-if="infoProduct.length > 0"
                class="!font-poppins !font-regular !px-[10px]
                2xl:!text-[22px]
                xl:!text-[15px]"
            >
                {{ infoProduct[0].partNumber }}
            </h1>
        </div>
        <hr
            class="!border-[#666666] !w-[100%] !h-[1px]"
        >
        <div
            class="!flex !flex-row !justify-between !items-center
            !w-[100%]"
        >
            <!-- Group -->
            <h1
                v-if="infoProduct.length > 0"
                class="!font-poppins !font-regular !px-[10px]
                2xl:!text-[22px]
                xl:!text-[15px]"
            >
                <strong>Grupo de productos</strong>
            </h1>
            <h1
                v-if="infoProduct.length > 0"
                class="!font-poppins !font-regular !px-[10px]
                2xl:!text-[22px]
                xl:!text-[15px]"
            >
                {{ infoProduct[0].group }}
            </h1>
        </div>
        <hr
            class="!border-[#666666] !w-[100%] !h-[1px]"
        >
        <div
            class="!flex !flex-row !justify-between !items-center
            !w-[100%]"
        >
            <!-- GTIN/EAN -->
            <h1
                v-if="infoProduct.length > 0"
                class="!font-poppins !font-regular !px-[10px]
                2xl:!text-[22px]
                xl:!text-[15px]"
            >
                <strong>GTIN/EAN</strong>
            </h1>
            <h1
                v-if="infoProduct.length > 0"
                class="!font-poppins !font-regular !px-[10px]
                2xl:!text-[22px]
                xl:!text-[15px]"
            >
                {{ infoProduct[0].gtin }}
            </h1>
        </div>
        <hr
            class="!border-[#666666] !w-[100%] !h-[1px]"
        >
        <div
            class="!flex !flex-row !justify-between !items-center
            !w-[100%]"
        >
            <!-- Unidad por embalaje -->
            <h1
                v-if="infoProduct.length > 0"
                class="!font-poppins !font-regular !px-[10px]
                2xl:!text-[22px]
                xl:!text-[15px]"
            >
                <strong>Unidad por embalaje</strong>
            </h1>
            <h1
                v-if="infoProduct.length > 0"
                class="!font-poppins !font-regular !px-[10px]
                2xl:!text-[22px]
                xl:!text-[15px]"
            >
                {{ infoProduct[0].unitPerEmbalaje }}
            </h1>
        </div>
        <hr
            class="!border-[#666666] !w-[100%] !h-[1px]"
        >
        <div
            class="!flex !flex-row !justify-between !items-center
            !w-[100%]"
        >
            <!-- Cantidad por unidad -->
            <h1
                v-if="infoProduct.length > 0"
                class="!font-poppins !font-regular !px-[10px]
                2xl:!text-[22px]
                xl:!text-[15px]"
            >
                <strong>Cantidad por unidad</strong>
            </h1>
            <h1
                v-if="infoProduct.length > 0"
                class="!font-poppins !font-regular !px-[10px]
                2xl:!text-[22px]
                xl:!text-[15px]"
            >
                {{ infoProduct[0].quantityPerUnit }}
            </h1>
        </div>
            
        <!-- Separador -->
        <v-divider class="!w-full !border-[1px] !border-[#666666] !opacity-100 !my-[20px]"></v-divider>

        <div
            class="!flex !w-full
            !justify-between !items-start
            max-[1024px]:!gap-[40px]
            max-[820px]:!gap-[30px] max-[820px]:!ml-[25px]"
        >
            <!-- Mensaje de compra protegida
            <div
                class="!flex !flex-row !items-center !pl-[10px]
                !bg-[#D4EDDA]
                max-[1024px]:!h-[55px] max-[1024px]:!w-[340px] max-[1024px]:!gap-[15px]
                max-[820px]:!h-[40px] max-[820px]:!w-[250px] max-[820px]:!gap-[10px]"
            >
                <i 
                    class="mdi mdi-checkbox-outline !text-[#155746]
                    max-[1024px]:!text-[35px]
                    max-[820px]:!text-[20px]"
                ></i>

                <h3
                    class="!font-poppins !text-[#155746]
                    max-[1024px]:!text-[16px]
                    max-[820px]:!text-[12px]"
                >
                    <strong>{{ $t('single-products.texto-protegida-inicio') }}</strong> {{ $t('single-products.texto-protegida-final') }}
                </h3>
            </div> -->
            
            <div
                class="!w-[100%]"
            >
                <h1
                    class="!font-poppins !font-bold !mb-[20px]
                    2xl:!text-[22px]
                    xl:!text-[20px]"
                >
                    Criterios de articulo
                </h1>

                <div
                    v-if="infoProduct.length > 0"
                    v-for="(criteria, index) in infoProduct[0].criteria"
                    :key="index"
                >
                    <div
                        class="!flex !justify-between !px-[10px]"
                    >
                        <p class="!font-poppins !text-[#444444] !text-[15px]">
                            <strong>{{ criteria.criteriaDescription }}</strong>
                        </p>
                        <p class="!font-poppins !text-[#444444] !text-[15px]">
                            {{ criteria.formattedValue }}
                        </p>
                    </div>
                    <hr
                        class="!border-[#666666] !w-[100%] !h-[1px] !my-[5px]"
                    >
                </div>
            </div>

            <!-- Separador -->
            <v-divider class="!w-full !border-[1px] !border-[#666666] !opacity-100 !my-[20px]" inset vertical></v-divider>

            <!-- Botones de compra y compartir -->
            <div
                class="!flex !flex-col !gap-[10px]"
            >
                <!-- Seleccionar cantidad -->
                <SelectNumber 
                    :oscuro="true"
                />

                <!-- Boton de agregar al carrito -->
                <ButtonGeneral 
                    variante="outlined"
                    class="!font-poppins !font-medium !text-md !w-[250px]
                    !h-[36px] !rounded-[5px] !normal-case !text-[#FF4338]"
                    :label="$t('buttons.products')"
                />

                <!-- Boton de compra y compartir -->
                <div
                    class="!flex !flex-row !gap-[13px]"
                >

                    <!-- Boton de comprar -->
                    <ButtonGeneral 
                        variante="tonal"
                        class="!font-poppins !font-medium !text-md !w-[170px]
                        !h-[36px] !rounded-[5px] !normal-case !bg-[#FF4338] !text-[#FFFFFF]"
                        :label="$t('buttons.buy')"
                    />

                    <!-- Botones de compartir y guardar -->
                    <div
                        class="!flex !flex-row !items-center !gap-[10px] !ml-[5px]"
                    >
                        <!-- Boton de compartir -->
                        <LittleButton 
                            icon_line="mdi mdi-share-outline"
                            icon_fill="mdi mdi-share"
                            :selectable="false"
                        />

                        <!-- Boton de guardar -->
                        <LittleButton 
                            icon_line="mdi mdi-cards-heart-outline"
                            icon_fill="mdi mdi-cards-heart"
                            :selectable="true"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Contenedor de la imagen y la informacion del producto - MOBILE -->
    <div
        class="!flex !flex-col !items-center !justify-start !justify-self-center !rounded-br-[35px] !rounded-bl-[35px] !bg-[#E6E6E6]
        min-[1024px]:!hidden
        min-[820px]:!hidden
        min-[768px]:!hidden
        max-[500px]:!w-[95%] max-[500px]:!h-[1160px] max-[500px]:!mb-[50px] max-[500px]:!px-[20px] max-[500px]:!pt-[30px] max-[500px]:!gap-[30px] max-[500px]:!py-[0px]"
    >
        <!-- Espacio reservado para las imágenes mientras carga (CLS) -->
        <div
            v-if="isLoading"
            class="!bg-[#FFFFFF] !rounded-[5px] max-[500px]:!w-[350px] max-[500px]:!h-[440px]"
        />
        <!-- Imagenes del producto -->
        <ImagenesProductos 
            v-if="cantidadImagenes !== null && cantidadImagenes > 0 && infoProduct.length > 0"
            :imagenPrincipal="ImagenDefault"
            :imagenAlt1="ImagenDefault"
            :imagenAlt2="ImagenDefault"
            :imagenAlt3="ImagenDefault"
            :imagenAlt4="ImagenDefault"
            :cantidadImagenes="cantidadImagenes"
            :imagenes="infoProduct[0].images"
        />

        <!-- Informacion del producto -->
        <div
            class="!flex !flex-col !rounded-[5px] !justify-center !mt-[20px]
            !gap-[10px]
            max-[1024px]:!w-100% max-[1024px]:!h-[550px] max-[1024px]:!p-[45px]
            max-[500px]:!w-90% max-[500px]:!h-[550px] max-[500px]:!p-[10px]"
        >
            <div
                class="!flex !flex-row !justify-between !items-center !gap-[10px]
                !w-[100%]"
            >
                <!-- Nombre del producto -->
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    <strong>Marca</strong>
                </h1>
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    {{ infoProduct[0].fabriName }}
                </h1>
            </div>
            <hr
                class="!border-[#666666] !w-[100%] !h-[1px] "
            >
            <div
                class="!flex !flex-row !justify-between !items-center
                !w-[100%]"
            >
                <!-- Número de articulo -->
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    <strong>Número de articulo</strong>
                </h1>
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    {{ infoProduct[0].partNumber }}
                </h1>
            </div>
            <hr
                class="!border-[#666666] !w-[100%] !h-[1px]"
            >
            <div
                class="!flex !flex-row !justify-between !items-center
                !w-[100%]"
            >
                <!-- Group -->
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    <strong>Grupo de productos</strong>
                </h1>
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    {{ infoProduct[0].group }}
                </h1>
            </div>
            <hr
                class="!border-[#666666] !w-[100%] !h-[1px]"
            >
            <div
                class="!flex !flex-row !justify-between !items-center
                !w-[100%]"
            >
                <!-- GTIN/EAN -->
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    <strong>GTIN/EAN</strong>
                </h1>
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    {{ infoProduct[0].gtin }}
                </h1>
            </div>
            <hr
                class="!border-[#666666] !w-[100%] !h-[1px]"
            >
            <div
                class="!flex !flex-row !justify-between !items-center
                !w-[100%]"
            >
                <!-- Unidad por embalaje -->
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    <strong>Unidad por embalaje</strong>
                </h1>
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    {{ infoProduct[0].unitPerEmbalaje }}
                </h1>
            </div>
            <hr
                class="!border-[#666666] !w-[100%] !h-[1px]"
            >
            <div
                class="!flex !flex-row !justify-between !items-center
                !w-[100%]"
            >
                <!-- Cantidad por unidad -->
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    <strong>Cantidad por unidad</strong>
                </h1>
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-regular !px-[10px]
                    2xl:!text-[22px]
                    xl:!text-[15px]"
                >
                    {{ infoProduct[0].quantityPerUnit }}
                </h1>
            </div>

            <!-- Separador -->
            <v-divider class="!w-full !border-[1px] !border-[#666666] !opacity-100 !mt-[20px]"></v-divider>
            
            <h1
                class="!font-poppins !font-bold !mt-[10px]
                2xl:!text-[22px]
                xl:!text-[20px]"
            >
                Criterios de articulo
            </h1>

            <div
                v-if="infoProduct.length > 0"
                v-for="(criteria, index) in infoProduct[0].criteria"
                :key="index"
            >
                <div
                    class="!flex !justify-between !px-[10px]"
                >
                    <p class="!font-poppins !text-[#444444] !text-[15px]">
                        <strong>{{ criteria.criteriaDescription }}</strong>
                    </p>
                    <p class="!font-poppins !text-[#444444] !text-[15px]">
                        {{ criteria.formattedValue }}
                    </p>
                </div>
                <hr
                    class="!border-[#666666] !w-[100%] !h-[1px] !my-[5px]"
                >
            </div>

            <!-- Contenedor del precio y compra protegida -->
            <div
                class="!flex !flex-col !items-center !mt-[20px]"
            >
                <!-- Precio del producto
                <h1
                    v-if="infoProduct.length > 0"
                    class="!font-poppins !font-bold
                    max-[1024px]:!text-[40px]"
                >
                    {{ infoProduct[0].price }}
                </h1>

                <div
                    class="!flex !flex-row !items-center !pl-[10px]
                    !bg-[#D4EDDA] !h-[40px] !w-[250px] !gap-[10px] !mb-[20px]"
                >
                    <i 
                        class="mdi mdi-checkbox-outline !text-[#155746]
                        max-[1024px]:!text-[35px]
                        max-[820px]:!text-[20px]"
                    ></i>

                    <h3
                        class="!font-poppins !text-[#155746]
                        max-[1024px]:!text-[16px]
                        max-[820px]:!text-[12px]"
                    >
                        <strong>{{ $t('single-products.texto-protegida-inicio') }}</strong> {{ $t('single-products.texto-protegida-final') }}
                    </h3>
                </div> -->

                <!-- Botones de compra y compartir -->
                <div
                    class="!flex !flex-col !gap-[10px]"
                >
                    <!-- Seleccionar cantidad -->
                    <SelectNumber 
                        :oscuro="true"
                    />

                    <!-- Boton de agregar al carrito -->
                    <ButtonGeneral 
                        variante="outlined"
                        class="!font-poppins !font-medium !text-md !w-[250px]
                        !h-[36px] !rounded-[5px] !normal-case !text-[#FF4338]"
                        :label="$t('buttons.products')"
                    />

                    <!-- Boton de compra y compartir -->
                    <div
                        class="!flex !flex-row !gap-[13px]"
                    >
                        <!-- Boton de comprar -->
                        <ButtonGeneral 
                            variante="tonal"
                            class="!font-poppins !font-medium !text-md !w-[170px]
                            !h-[36px] !rounded-[5px] !normal-case !bg-[#FF4338] !text-[#FFFFFF]"
                            :label="$t('buttons.buy')"
                        />

                        <!-- Botones de compartir y guardar -->
                        <div
                            class="!flex !flex-row !items-center !gap-[10px] !ml-[5px]"
                        >
                            <!-- Boton de compartir -->
                            <LittleButton 
                                icon_line="mdi mdi-share-outline"
                                icon_fill="mdi mdi-share"
                                :selectable="false"
                            />
                            
                            <!-- Boton de guardar -->
                            <LittleButton 
                                icon_line="mdi mdi-cards-heart-outline"
                                icon_fill="mdi mdi-cards-heart"
                                :selectable="true"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <Footer />
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { tecdoc } from '../services/tecdoc'
import { setPageTitle } from '../services/pageTracking'
import { trackEvent } from '../services/analytics'

import Header from '../components/sections/Header.vue'
import Footer from '../components/sections/Footer.vue'

import LittleButton from '../components/LittleButtonsProduct.vue'
import ImagenesProductos from '../components/ImagenesProductos.vue'

import ImagenDefault from '../assets/images/default.jpg'

import PageLoader from '../components/PageLoader.vue'

import SelectNumber from '../components/SelectNumber.vue'
import ButtonGeneral from '../components/ButtonGeneral.vue'

import { useRoute } from 'vue-router'

import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const route = useRoute()

// Obtener variables de la URL
const idProduct = ref(route.params.id)

// Lista de productos disponibles
const infoProduct = ref([])

// Variable reactiva para el número de imagenes
const cantidadImagenes = ref(0)

const isLoading = ref(true)

// Función para obtener la información del producto desde la API
async function getInfoProduct() {
    try {
        let response = await tecdoc({
            "getArticles": {
                "articleCountry": localStorage.getItem('country'),
                "searchQuery": idProduct.value,
                "perPage": 5,
                "page": 1,
                "includeAll": true
            }
        });
        infoProduct.value = response.data.articles.map(item => ({
            fabriName: item.mfrName,
            group: item.genericArticles.map(item => item.genericArticleDescription).join(', ') || "",
            gtin: item.gtins[0],
            partNumber: item.articleNumber,
            unitPerEmbalaje: item.misc.quantityPerPackage,
            quantityPerUnit: item.misc.quantityPerPartPerPackage,
            price: item.price ? `$ ${item.price}` : '$0',
            // 800 px basta para el tamaño en pantalla (máx. 680 px); la de 3200 px pesaba varias veces más
            images: item.images.map(img => img.imageURL800 || img.imageURL1600 || img.imageURL3200),
            criteria: item.articleCriteria
        }));
        cantidadImagenes.value = infoProduct.value[0].images.length

        // Mismo título que genera el backend: nombre, referencia y marca
        const product = infoProduct.value[0]
        setPageTitle(`${product.group} ${product.partNumber} - ${product.fabriName}`, route.fullPath)

        // Vista de producto (ANA-05) con el formato de comercio electrónico de GA4.
        // No hay precio de venta, así que no se envía valor ni moneda.
        trackEvent('view_item', {
            ecommerce: {
                items: [{
                    item_id: product.partNumber,
                    item_name: product.group,
                    item_brand: product.fabriName
                }]
            }
        })
    } catch (error) {
        console.log(error);
    }
}

// Cálculo de las fechas para la entrega estimada
const fechaHoy = ref(new Date())

const fechaTresDias = ref(new Date(fechaHoy.value))
fechaTresDias.value.setDate(fechaTresDias.value.getDate() + 3)

const fechaCincoDias = ref(new Date(fechaHoy.value))
fechaCincoDias.value.setDate(fechaCincoDias.value.getDate() + 5)

const dayNumberTresDias = fechaTresDias.value.getDate()
const dayNumberCincoDias = fechaCincoDias.value.getDate()

const dayNameTresDias = computed(() =>
  new Intl.DateTimeFormat(locale.value, { weekday: 'long' }).format(fechaTresDias.value)
)

const monthNameTresDias = computed(() =>
  new Intl.DateTimeFormat(locale.value, { month: 'long' }).format(fechaTresDias.value)
)

const dayNameCincoDias = computed(() =>
  new Intl.DateTimeFormat(locale.value, { weekday: 'long' }).format(fechaCincoDias.value)
)

const monthNameCincoDias = computed(() =>
  new Intl.DateTimeFormat(locale.value, { month: 'long' }).format(fechaCincoDias.value)
)

// Llamar a la función para obtener la información del producto cuando el componente se monta
onMounted(async () => {
    await getInfoProduct();
    isLoading.value = false
});
</script>