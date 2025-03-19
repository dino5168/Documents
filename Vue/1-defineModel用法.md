# defineModel

### 3.4 以後版本的語法糖

```ts
childComponent.vue :

const bindData =  defineModel<type>
<input v-model="bindData" placeholder="請輸入文字" /> 綁定資料

-------

parent.vue
const messege = ref("message")
<chilcdComponent v-model="messsage"></childComponent>

// 監聽 selectedValue 變化 使用 watch 的方法
watch(selectedValue, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        alert(newValue);
    }

});

```
