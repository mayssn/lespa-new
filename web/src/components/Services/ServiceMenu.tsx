import React from "react";
import type { ServiceMenuSection } from "../../sanity/types";
import "./ServiceMenu.css";

type Props = {
  sections: ServiceMenuSection[];
};

const ServiceMenu: React.FC<Props> = ({ sections }) => {
  if (!sections || sections.length === 0) return null;

  console.log("SECTIONS", sections);

  return (
    <div className="serviceMenu">
      {sections.map((section) => (
        <React.Fragment key={section._key}>
          <div className="serviceMenuSection">
            <div className="menuList">
              {(section.items || []).map((item, i) => (
                <div key={item._key} className="menuRow">
                  <div className="menuRowTop">
                    <div className="menuItemTitle">{item.name}</div>

                    <div className="menuRight">
                      {item.duration && (
                        <span className="menuDuration">{item.duration}</span>
                      )}
                      {item.price && (
                        <span className="menuPrice">{item.price}</span>
                      )}
                    </div>
                  </div>

                  {item.description && (
                    <div className="menuDescription">{item.description}</div>
                  )}

                  {!!(item.tags && item.tags.length) && (
                    <div className="menuTags">
                      {item.tags
                        .slice()
                        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
                        .map((t, idx) => (
                          <span key={t._id} className="menuTag">
                            {t.title}
                            {idx !== item.tags.length - 1 && (
                              <span className="tagDot"> • </span>
                            )}
                          </span>
                        ))}
                    </div>
                  )}

                  {i !== (section.items?.length || 0) - 1 && (
                    <div className="menuDivider" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ServiceMenu;
