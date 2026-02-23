## タスク

- [x] ソート機能の実装
- [x] タスク名の編集できるようにする
- [x] 締切の編集できるようにする
- [x] useRefを使ってチェックのアニメーションをつける
- [x] 完了▶︎未完了に戻す時はアニメーションさせないようにする
- [x] 編集後、タスク名が空の時はアラートを出す
- [x] 編集後、締切が空の時はアラートを出す
- [ ] タスク操作（完了状態、追加、削除、編集）親コンポーネントに移動

## コンポーネント階層

```page.js
  - <Header />
  - <Form onSubmit={handleFormSubmit} />
  - <Lists taskItems={taskItems} setTaskItems={setTaskItems} />
    - <List />
```

## 各コンポーネントの役割

- pages.js...tasks配列の管理・更新
  - useState-`taskItems`
  - 関数-`handleFormSubmit()`->フォーム送信したら、`taskItems`を追加して更新
  - props-Form.jsに`handleFormSubmit()`を渡す
  - props-Lists.jsに`taskItems`と`setTaskItems()`を渡す

- Header...ヘッダーの表示

- Form...フォームの入力状態管理・バリデーション・page.jsにタスク名と締切を渡す
  - useState-`taskName`
  - useState-`taskDeadline`
  - useRef-`input`（タスク名入力フォーム）にフォーカスを当てる
  - 関数-`handleTextInput()`->フォームに入力されたタスク名を`taskName`にセット
  - 関数-`handleDeadlineInput()`->フォームに入力された締切を`taskDeadline`にセット
  - 関数-`handleSubmit()`->タスク名、締切のバリデーション、フォーム送信後にリセット、`props`で渡ってきた`handleFormSubmit()`にタスク名と締切を渡す

- Lists...各タスクの完了更新・削除▶︎表示
  - useState-`showCompleted`
  - 関数-`handleShowCompleted()`->`showCompleted`の更新
  - 関数-`handleCheckbox()`->`task.isCompleted`をトグルする
  - 関数-`handleRename()`->`task.name`を更新する
  - 関数-`handleDeadlineChange()`->`task.deadline`を更新する
  - 関数-`handleDeleteAction()`->受け取ったidと一致するタスクを削除
  - `tasks`-各タスクをソートして表示

- List...タスクが編集状態かどうかの管理・編集後の値をListsに渡す
  - useState-`isEditing`
  - useState-`draftName`
  - useState-`isEditingDeadline`
  - useState-`draftDeadline`
  - 関数-`handleCheckbox()`->Listsの`onChecked()`にタスクのidを渡す
  - 関数-`handleDelete()`->Listsの`onDelete()`にタスクのidを渡す
  - 関数-`saveTaskName()`->Listsの`onRename()`に編集後のタスク名を渡す・`isEditing`をfalseにする
  - 関数-`saveDeadline()`->Listsの`onDeadlineChange()`に編集後の締切の値を渡す・`setIsEditingDeadline`をfalseにする
  - useRef-カレンダーUIの`input`要素を取得
  - useEffect-カレンダーUIが即座に表示されるようにする

## React Hooks

- `useEffect()`は、コールバック関数。毎レンダリングの直後に実行される。第二引数がある場合は、そのタイミングで実行される。第二引数が空の配列の場合は最初の一回しか実行されない。

- `useRef`は、DOM要素を参照するための特殊なオブジェクト。`.current` とすると、DOM要素の命令を使えるようになる。タグにref属性をつけて紐づける。また、無駄なレンダリングを防ぐことができる。

## Prettier を実行する

`npx prettier . --write`

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
