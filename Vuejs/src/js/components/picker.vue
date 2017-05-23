<template>
    <div class="picker">
        <div class="options">
            {{ name }}
        </div>

        <button class="name-picker" v-on:click="choose()">
            Kies iemand
        </button>
    </div>
</template>

<script>
    import Store from '../modules/Store';

    function getResult () {
        let current_data   = Store.get(),
            possible_names = current_data.names.filter(function (name) {
                return current_data.chosen.indexOf(name) < 0
            }),
            random_index   = Math.floor(Math.random() * possible_names.length),
            name           = possible_names[random_index];

        current_data.chosen.push(name);

        if (current_data.names.length === current_data.chosen.length) {
            current_data.chosen = [];
        }

        Store.set(current_data);

        return name;
    }

    export default {
        data () {
            return {
                name: null
            }
        },
        methods: {
            choose()
            {
                let names = Store.get().names,
                    self  = this;

                for (let i = 0; i <= 2; i++) {
                    names.forEach(function (name) {
                        self.name = name;

                        console.log(name);
                    });
                }

//                Event.fire('added','test');
            }
        },
        watch  : {
            name(old_value, new_value) {
                let vm = this;
                let animationFrame;

                function animate (time) {
                    TWEEN.update(time);
                    animationFrame = requestAnimationFrame(animate)
                }
                new TWEEN.Tween({ tweening: old_value })
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .to({ tweening: new_value }, 500)
                    .onUpdate(function () {
                        vm.animatedNumber = this.tweening
                    })
                    .onComplete(function () {
                        cancelAnimationFrame(animationFrame)
                    })
                    .start();

                animationFrame = requestAnimationFrame(animate);
            }
        }
    }
</script>