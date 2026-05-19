// ========================================
// components/users/UserAvatar.jsx
// ========================================

import {
  User,
} from "lucide-react";

export default function UserAvatar({
  user,
}) {

  return (

    <div
      className="
        flex
        h-12
        w-12
        items-center
        justify-center
        overflow-hidden
        rounded-2xl
        bg-slate-100

        dark:bg-slate-900
      "
    >

      {user.avatar ? (

        <img
          src={user.avatar}
          alt={user.name}
          className="
            h-full
            w-full
            object-cover
          "
        />

      ) : (

        <User size={20} />

      )}

    </div>

  );

}