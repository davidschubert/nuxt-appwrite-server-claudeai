<template>
    <section class="py-32">
        <UContainer>
            <h1 class="text-9xl">
                <FunGreetingmessage />
            </h1>
            <div v-if="auth2Store.isLoading">
                <USkeleton class="h-6 w-52" />
            </div>
            <div v-else-if="!auth2Store.isAuthenticated">
                <p>Bitte melden Sie sich an.</p>
            </div>
            <div v-else>
                <p>Wie geht es Dir, {{ auth2Store.user?.name }}</p>
            </div>
        </UContainer>
    </section>
    <section class="bg-primary-200 text-primary-950 py-32">
        <UContainer>
            <h2 class="text-8xl">Moin moin</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                error exercitationem. Maxime eaque natus, nobis sit consequuntur
                facere, optio impedit corrupti vel minus nostrum qui, possimus
                aperiam libero dolor sed quo perferendis porro consequatur eum
                assumenda. Deserunt, distinctio nesciunt ducimus delectus sed
                libero quidem repellendus eligendi veritatis autem. Et fugiat
                exercitationem error deserunt incidunt? Exercitationem beatae
                deserunt, distinctio maxime eum a omnis nihil assumenda pariatur
                quod voluptatum in recusandae, ad suscipit aperiam. Quam
                similique officia, ratione quaerat, temporibus maxime pariatur
                harum veritatis amet nisi doloribus, voluptatum odio repellat
                libero distinctio voluptate molestias minima ab provident quas.
                Tempore ratione molestias quas at possimus!
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                tempora delectus aspernatur cupiditate dolore quis quidem natus
                quas veniam adipisci! Libero quisquam, qui quia adipisci, sequi
                numquam architecto porro asperiores temporibus voluptatum ipsam
                commodi repellat dolorem. Quaerat molestiae dignissimos
                consequatur aliquid molestias consequuntur nobis et quam unde
                quibusdam, illo deserunt, sed illum magni? Harum assumenda
                voluptatem quos, tenetur quia sed dicta illo repellat a aut ea,
                recusandae error, mollitia hic obcaecati. Voluptatibus aperiam,
                tempore nihil a vel sequi dolor alias quae quasi ut vero id
                dignissimos maiores. Illum, enim, mollitia ipsam eligendi
                cupiditate, est provident odit dolorem omnis suscipit facere
                saepe iusto? Esse, modi nam deserunt, illum quidem perspiciatis
                fugiat placeat, dignissimos cupiditate ipsa iste ipsam
                voluptatum. A magni doloremque consequuntur maxime reiciendis,
                asperiores molestiae quia ea, distinctio earum inventore magnam
                vero harum sapiente tempora veniam iusto facere repellat
                temporibus dolor ipsam et non! Necessitatibus sequi saepe iste
                facilis incidunt quisquam voluptatum, vero error sunt sint eum
                molestiae enim laborum ad, beatae debitis, placeat voluptate
                modi tempora laboriosam recusandae a perferendis? Ipsa voluptate
                accusamus praesentium totam est natus, libero aliquid voluptates
                ipsum excepturi ut dolorum tempora repudiandae sed laudantium
                quos deleniti quia cupiditate! Dignissimos dolorem
                exercitationem odio officiis voluptatibus quia qui facilis
                praesentium voluptas vero labore minus expedita aut fugiat
                pariatur, ipsam magnam voluptatum adipisci? Id iusto pariatur
                laboriosam fugit veniam? Ut dolore voluptas nulla fugit dicta
                aspernatur tenetur corrupti deleniti, aperiam, aliquid adipisci
                accusamus velit. Placeat excepturi, eos unde hic quae esse optio
                saepe, iste obcaecati deserunt adipisci autem dolores atque
                aliquid. Est possimus exercitationem et repellat quo, illo totam
                quos obcaecati a. Amet nam possimus natus nobis tempore harum
                obcaecati ut aspernatur atque quas explicabo nihil beatae rerum
                corporis laudantium, sunt dicta libero vero impedit veniam minus
                doloribus. Sapiente aliquid, praesentium at veniam nobis
                laboriosam doloremque nostrum fugit ad. Consectetur, magnam
                explicabo temporibus exercitationem, architecto illo qui quod
                non nulla debitis distinctio molestias at repudiandae vero?
                Perspiciatis error laboriosam id porro mollitia nesciunt facere
                aut dolores sed dicta at nemo, in exercitationem voluptate
                praesentium architecto corrupti, nulla vero eos quia minus
                voluptatibus fugit, alias perferendis! Voluptate repellat
                assumenda numquam? Quisquam nulla harum ipsam, voluptatem
                officiis quam doloribus vitae eius ullam iste perferendis nihil
                qui, recusandae voluptatum est placeat, corporis perspiciatis
                libero accusamus sequi. Debitis nihil recusandae modi, non
                adipisci, ea est voluptatibus delectus id, ullam quia
                reprehenderit enim necessitatibus! Totam recusandae aliquam
                porro nostrum. Cumque illum molestiae reiciendis.
            </p>
        </UContainer>
    </section>
</template>

<script setup lang="ts">
const auth2Store = useAuth2Store();
</script>
