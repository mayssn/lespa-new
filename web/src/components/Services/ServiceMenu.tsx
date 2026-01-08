import React from "react";
import type { ServiceMenuItem } from "../../sanity/types";
import "./ServiceMenu.css";

type Props = {
  menuItems: ServiceMenuItem[];
};

const ServiceMenu: React.FC<Props> = ({ menuItems }) => {
  console.log("ServiceMenu Items Received:", menuItems);
  if (!menuItems || menuItems.length === 0) {
    return <div className="menuEmpty">No items found for this service.</div>;
  }

  return (
    <div className="serviceMenu">
      <div className="menuList">
        {menuItems.map((item, i) => (
          <div key={item._key} className="menuRow">
            <div className="menuRowTop">
              <div className="menuItemTitle">{item.name}</div>

              <div className="menuRight">
                {item.duration && (
                  <span className="menuDuration">
                    {item.duration}
                  </span>
                )}
                {item.price && <span className="menuPrice">{item.price}</span>}
              </div>
            </div>

            {item.description && (
              <div className="menuDescription">{item.description}</div>
            )}

            {!!(item.tags && item.tags.length) && (
              <div className="menuTags">
                {item.tags
                  .slice()
                  .sort((a, b: any) => (a.order ?? 999) - (b.order ?? 999))
                  .map((t: any, idx: number) => (
                    <span key={t._id} className="menuTag">
                      {t.title}
                      {idx !== item.tags.length - 1 && (
                        <span className="tagDot"> • </span>
                      )}
                    </span>
                  ))}
              </div>
            )}

            {i !== menuItems.length - 1 && <div className="menuDivider" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceMenu;
