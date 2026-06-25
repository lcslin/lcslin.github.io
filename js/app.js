// --- Default Assets Map ---
        const defaultAssets = {}; // images served as files via HTTP

        // --- Block Components Library ---
        const blockLibrary = {
            header: `
                <table class="edm-block" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" style="padding: 40px 30px 20px 30px;">
                            <h1 class="editable-text" style="color: #111111; font-size: 28px; margin: 0; font-family: 'Noto Serif TC', serif; font-weight: 900;">活動主標題</h1>
                            <p class="editable-text" style="color: #666666; font-size: 14px; margin: 10px 0 0 0; letter-spacing: 1px; text-transform: uppercase;">副標題 / 日期</p>
                        </td>
                    </tr>
                </table>
            `,
            hero: `
                <table class="edm-block" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>
                            <img class="editable-img" src="taipei-cycle.png" alt="主視覺" width="600" style="display: block; border: 0; width: 100%; max-width: 600px; height: auto;">
                        </td>
                    </tr>
                </table>
            `,
            text: `
                <table class="edm-block" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="padding: 20px 40px;">
                            <h2 class="editable-text" style="color: #111111; font-size: 20px; margin: 0 0 15px 0; font-family: 'Noto Serif TC', serif;">段落標題</h2>
                            <p class="editable-text" style="color: #444444; font-size: 15px; line-height: 1.8; margin: 0;">請在此輸入詳細內文。這是一個標準的文字區塊，適合用來敘述活動詳情、產品介紹或策展論述。</p>
                        </td>
                    </tr>
                </table>
            `,
            button: `
                <table class="edm-block" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" style="padding: 20px 40px 40px 40px;">
                            <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" style="border: 1px solid #111111;">
                                        <a href="#" class="editable-text" target="_blank" style="font-size: 13px; font-weight: bold; color: #111111; background-color: transparent; text-decoration: none; padding: 15px 30px; display: inline-block; letter-spacing: 1px; text-transform: uppercase;">行動呼籲</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            `,
            split: `
                <table class="edm-block" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="padding: 20px 40px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td width="45%" valign="top">
                                        <img class="editable-img" src="sourcing-split.png" alt="圖片" width="100%" style="display: block; border: 0;">
                                    </td>
                                    <td width="5%"></td>
                                    <td width="50%" valign="top">
                                        <h3 class="editable-text" style="color: #111111; font-size: 18px; margin: 0 0 10px 0; font-family: 'Noto Serif TC', serif;">雙欄排版</h3>
                                        <p class="editable-text" style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0;">圖文並茂的區塊，適合介紹重點講者或核心特色。</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            `,
            spacer: `
                <table class="edm-block" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr><td height="40" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
                </table>
            `,
            newsletter_header: `
                <table class="edm-block" width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#F8F8F8">
                    <tr>
                        <td align="center" style="padding: 20px 0;">
                            <img class="editable-img" src="https://assets.echobox.com/urn:property:14544/be994c90-85c9-41cc-95b0-5f15b778ea74.jpg" alt="VERSE Logo" width="600" style="display: block; border: 0; width: 100%; max-width: 600px; height: auto;">
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 10px 25px;">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td height="24" valign="bottom"><a href="#" class="editable-text" style="font-family: sans-serif; font-size: 20px; color: #222000; text-decoration: none;">人物</a></td>
                                    <td width="40"></td>
                                    <td height="24" valign="bottom"><a href="#" class="editable-text" style="font-family: sans-serif; font-size: 20px; color: #222000; text-decoration: none;">專題</a></td>
                                    <td width="40"></td>
                                    <td height="24" valign="bottom"><a href="#" class="editable-text" style="font-family: sans-serif; font-size: 20px; color: #222000; text-decoration: none;">藝文</a></td>
                                    <td width="40"></td>
                                    <td height="24" valign="bottom"><a href="#" class="editable-text" style="font-family: sans-serif; font-size: 20px; color: #222000; text-decoration: none;">飲食</a></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            `,
            newsletter_greeting: `
                <table class="edm-block" width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#F8F8F8">
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF">
                                <tr>
                                    <td style="padding: 25px 30px;">
                                        <p class="editable-text" style="font-family: sans-serif; font-size: 16px; color: #222000; line-height: 1.6; margin: 0;">歡迎來到 <strong>VERSE 文化周報</strong>，一份由編輯群每週策劃的電子報。我們在這裡分享正在閱讀、聆聽、觀看，或深深著迷的文化大小事。</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            `,
            newsletter_article: `
                <table class="edm-block" width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#F8F8F8">
                    <tr>
                        <td align="center" style="padding: 20px 25px 10px 25px;">
                            <a href="#" class="editable-text" style="font-family: sans-serif; font-size: 18px; font-weight: bold; color: #707171; text-decoration: none;">買得起的設計師單品！IKEA PS 2026 重磅回歸 - VERSE</a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 10px 25px;">
                            <img class="editable-img" src="taipei-cycle.png" alt="Article Image" width="550" style="display: block; border: 0; width: 100%; max-width: 550px; height: auto;">
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 10px 25px 20px 25px;">
                            <p class="editable-text" style="font-family: sans-serif; font-size: 14px; color: #222000; line-height: 1.6; margin: 0;">本次以「Playful Functionality（玩味機能）」為設計核心，集結 12 位設計師打造 44 款涵蓋家具、家飾與織品的新品系列。</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 0 25px;">
                            <div style="border-top: 1px solid #000; width: 100%; height: 1px; font-size: 0; line-height: 0;">&nbsp;</div>
                        </td>
                    </tr>
                </table>
            `
        };

        const getHero = (src, alt) => `
                <table class="edm-block" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>
                            <img class="editable-img" src="${src}" alt="${alt}" width="600" style="display: block; border: 0; width: 100%; max-width: 600px; height: auto;">
                        </td>
                    </tr>
                </table>
        `;

        const templates = {
            seminar: blockLibrary.header + getHero('taipei-cycle.png', '研討會論壇主視覺') + blockLibrary.text + blockLibrary.split + blockLibrary.button,
            mission: getHero('taipei-cycle.png', '傳統市場拓銷團') + blockLibrary.header + blockLibrary.split + blockLibrary.button,
            expo: getHero('taipei-cycle.png', '扣件工具機專業展') + blockLibrary.header + blockLibrary.text + blockLibrary.button,
            course: blockLibrary.header + getHero('taipei-cycle.png', '訓練課程主視覺') + blockLibrary.text + blockLibrary.split + blockLibrary.button,
            newsletter: blockLibrary.newsletter_header + blockLibrary.newsletter_greeting + blockLibrary.newsletter_article + blockLibrary.newsletter_article + blockLibrary.spacer
        };

        const canvas = document.getElementById('edm-canvas');
        const wrapper = document.getElementById('canvas-wrapper');
        const floatBar = document.getElementById('img-float-bar');
        const blockFloatBar = document.getElementById('block-float-bar');
        const hiddenImageUpload = document.getElementById('hidden-image-upload');
        const savedListContainer = document.getElementById('saved-list');
        
        let selectedImageElement = null;
        let activeBlock = null;

        // --- Initialization & LocalForage ---
        document.addEventListener('DOMContentLoaded', loadSavedList);

        async function loadSavedList() {
            savedListContainer.innerHTML = '';
            try {
                const keys = await localforage.keys();
                const drafts = keys.filter(k => k.startsWith('edm_draft_'));
                
                if (drafts.length === 0) {
                    savedListContainer.innerHTML = '<span style="color:#999; font-size: 13px;">尚無儲存草稿</span>';
                    return;
                }

                // Sort drafts by newest first (parsing timestamp from key)
                drafts.sort((a, b) => b.split('_')[2] - a.split('_')[2]);

                for (let key of drafts) {
                    const data = await localforage.getItem(key);
                    const div = document.createElement('div');
                    div.className = 'saved-item';
                    
                    const span = document.createElement('span');
                    span.textContent = data.subject && data.subject !== '未命名草稿' ? data.subject : data.dateStr;
                    span.onclick = () => loadDraft(data);
                    
                    const delBtn = document.createElement('button');
                    delBtn.className = 'del-draft-btn';
                    delBtn.textContent = '刪除';
                    delBtn.onclick = async (e) => {
                        e.stopPropagation();
                        if(confirm('確定要刪除此草稿嗎？')) {
                            await localforage.removeItem(key);
                            loadSavedList();
                        }
                    };
                    
                    div.appendChild(span);
                    div.appendChild(delBtn);
                    savedListContainer.appendChild(div);
                }
            } catch(e) { console.error(e); }
        }

        document.getElementById('btn-save').addEventListener('click', async () => {
            if (canvas.querySelector('.empty-state')) {
                alert('沒有可儲存的內容！'); return;
            }
            try {
                // Remove active states before saving
                clearImageSelection();
                clearBlockSelection();
                tinymce.triggerSave();

                const clone = canvas.cloneNode(true);
                // Clean tinymce classes for clean save
                clone.querySelectorAll('.editable-text').forEach(el => {
                    el.classList.remove('mce-content-body', 'mce-edit-focus');
                    if(el.id && el.id.startsWith('mce_')) el.removeAttribute('id');
                });

                const subject = document.getElementById('meta-subject').value || '未命名草稿';
                const key = 'edm_draft_' + new Date().getTime();
                const data = {
                    html: clone.innerHTML,
                    subject: subject,
                    dateStr: new Date().toLocaleString()
                };
                await localforage.setItem(key, data);
                alert('草稿已儲存！');
                loadSavedList();
            } catch (err) { alert('儲存失敗：' + err); }
        });

        function loadDraft(data) {
            tinymce.remove();
            canvas.innerHTML = data.html;
            document.getElementById('meta-subject').value = data.subject && data.subject !== '未命名草稿' ? data.subject : '';
            setupEditor();
        }

        // --- Template Loading ---
        document.querySelectorAll('.template-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.getAttribute('data-type');
                if (templates[type]) {
                    tinymce.remove();
                    canvas.innerHTML = templates[type];
                    setupEditor();
                }
            });
        });

        // --- Editor Setup (TinyMCE & Event Listeners) ---
        function setupEditor() {
            tinymce.init({
                selector: '.editable-text',
                inline: true,
                menubar: false,
                plugins: 'link lists paste image',
                toolbar: 'undo redo | bold italic | forecolor backcolor | alignleft aligncenter | link image',
                paste_data_images: true,
                valid_elements: '+*[*]',
                setup: function(editor) {
                    editor.on('click', function(e) { if (e.target.tagName === 'A') e.preventDefault(); });
                },
                file_picker_callback: function (cb, value, meta) {
                    if (meta.filetype === 'image') {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'file'); input.setAttribute('accept', 'image/*');
                        input.onchange = function () {
                            const file = this.files[0];
                            const reader = new FileReader();
                            reader.onload = function () { cb(reader.result, { title: file.name }); };
                            reader.readAsDataURL(file);
                        };
                        input.click();
                    }
                }
            });

            setupEventListeners();
        }

        function setupEventListeners() {
            // Images
            canvas.querySelectorAll('.editable-img').forEach(img => {
                img.removeEventListener('click', handleImageClick);
                img.addEventListener('click', handleImageClick);
            });

            // Blocks (for ordering/deleting)
            canvas.querySelectorAll('.edm-block').forEach(block => {
                block.removeEventListener('click', handleBlockClick);
                block.addEventListener('click', handleBlockClick);
            });
        }

        // --- Block Management ---
        document.getElementById('btn-add-block').addEventListener('click', () => {
            if (canvas.querySelector('.empty-state')) canvas.innerHTML = '';
            document.getElementById('modal-add-block').style.display = 'flex';
        });

        document.querySelectorAll('.insert-block-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.getAttribute('data-block');
                const html = blockLibrary[type];
                canvas.insertAdjacentHTML('beforeend', html);
                document.getElementById('modal-add-block').style.display = 'none';
                
                // Re-init tinymce for new elements
                tinymce.remove();
                setupEditor();
            });
        });

        function handleBlockClick(e) {
            e.stopPropagation();
            clearBlockSelection();
            activeBlock = e.currentTarget;
            activeBlock.classList.add('active-block');
            
            const rect = activeBlock.getBoundingClientRect();
            const wrapperRect = wrapper.getBoundingClientRect();
            
            blockFloatBar.style.display = 'flex';
            blockFloatBar.style.top = (rect.top - wrapperRect.top + wrapper.scrollTop) + 'px';
        }

        function clearBlockSelection() {
            if (activeBlock) activeBlock.classList.remove('active-block');
            activeBlock = null;
            blockFloatBar.style.display = 'none';
        }

        document.getElementById('btn-move-up').addEventListener('click', () => {
            if (activeBlock && activeBlock.previousElementSibling) {
                activeBlock.parentNode.insertBefore(activeBlock, activeBlock.previousElementSibling);
                handleBlockClick({currentTarget: activeBlock, stopPropagation: ()=>{}}); // re-position
            }
        });
        
        document.getElementById('btn-move-down').addEventListener('click', () => {
            if (activeBlock && activeBlock.nextElementSibling) {
                activeBlock.parentNode.insertBefore(activeBlock.nextElementSibling, activeBlock);
                handleBlockClick({currentTarget: activeBlock, stopPropagation: ()=>{}}); // re-position
            }
        });

        document.getElementById('btn-delete-block').addEventListener('click', () => {
            if (activeBlock) {
                activeBlock.remove();
                clearBlockSelection();
                if (canvas.children.length === 0) {
                    canvas.innerHTML = '<div class="empty-state">尚未建立內容。<br>請從左側選擇版型範本，或建立全新區塊。</div>';
                }
            }
        });

        // --- Image Replacement ---
        function handleImageClick(e) {
            e.stopPropagation();
            clearImageSelection();
            selectedImageElement = e.target;
            selectedImageElement.classList.add('img-selected');

            const imgRect = selectedImageElement.getBoundingClientRect();
            const wrapperRect = wrapper.getBoundingClientRect();

            floatBar.style.display = 'flex';
            floatBar.style.left = (imgRect.left - wrapperRect.left + imgRect.width / 2) + 'px';
            floatBar.style.top = (imgRect.top - wrapperRect.top + wrapper.scrollTop + imgRect.height / 2) + 'px';
        }

        function clearImageSelection() {
            if (selectedImageElement) selectedImageElement.classList.remove('img-selected');
            selectedImageElement = null;
            floatBar.style.display = 'none';
        }

        document.getElementById('btn-replace-img').addEventListener('click', () => hiddenImageUpload.click());

        document.getElementById('btn-paste-img').addEventListener('click', () => {
            navigator.clipboard.read().then(items => {
                for (const item of items) {
                    const imgType = item.types.find(t => t.startsWith('image/'));
                    if (imgType) {
                        item.getType(imgType).then(blob => processImageFile(blob));
                        return;
                    }
                }
            }).catch(() => alert('請先複製圖片，再按貼上'));
        });

        document.getElementById('btn-img-vertical').addEventListener('click', () => {
            if (!selectedImageElement) return;
            selectedImageElement.style.width = 'auto';
            selectedImageElement.style.maxWidth = '100%';
            selectedImageElement.style.height = 'auto';
            selectedImageElement.style.maxHeight = '400px';
            selectedImageElement.style.display = 'block';
            clearImageSelection();
        });

        document.getElementById('btn-img-center').addEventListener('click', () => {
            if (!selectedImageElement) return;
            selectedImageElement.style.display = 'block';
            selectedImageElement.style.marginLeft = 'auto';
            selectedImageElement.style.marginRight = 'auto';
            clearImageSelection();
        });

        hiddenImageUpload.addEventListener('change', function(e) {
            processImageFile(e.target.files[0]);
            this.value = '';
        });

        document.addEventListener('paste', function(e) {
            if (!selectedImageElement) return;
            const items = (e.clipboardData || e.originalEvent.clipboardData).items;
            for (let index in items) {
                const item = items[index];
                if (item.kind === 'file' && item.type.startsWith('image/')) {
                    e.preventDefault();
                    processImageFile(item.getAsFile());
                    return;
                }
            }
        });

        function processImageFile(file) {
            if (!file) return;
            if (!file.type.match('image.*')) { alert('請選擇圖片檔案'); return; }
            const reader = new FileReader();
            reader.onload = function(event) {
                if (selectedImageElement) {
                    const imgEl = selectedImageElement;
                    imgEl.src = event.target.result;
                    imgEl.style.filter = 'brightness(1.3)';
                    clearImageSelection();
                    setTimeout(() => { imgEl.style.filter = ''; }, 300);
                }
            };
            reader.readAsDataURL(file);
        }

        // Global click clears
        document.addEventListener('click', (e) => {
            if(!e.target.closest('.editable-img') && !floatBar.contains(e.target)) clearImageSelection();
            if(!e.target.closest('.edm-block') && !blockFloatBar.contains(e.target) && !e.target.closest('#add-block-container')) clearBlockSelection();
        });

        // --- Export ZIP ---
        document.getElementById('btn-export').addEventListener('click', async () => {
            if (canvas.querySelector('.empty-state')) { alert('請先建立內容！'); return; }

            const subject = document.getElementById('meta-subject').value || '未命名 EDM';
            const title = subject;

            tinymce.remove();
            clearImageSelection();
            clearBlockSelection();
            
            const clone = canvas.cloneNode(true);
            clone.querySelectorAll('.editable-text').forEach(el => {
                el.removeAttribute('contenteditable');
                el.removeAttribute('spellcheck');
                el.classList.remove('editable-text', 'mce-content-body', 'mce-edit-focus');
                if(el.id && el.id.startsWith('mce_')) el.removeAttribute('id');
            });
            clone.querySelectorAll('.editable-img').forEach(el => el.classList.remove('editable-img'));
            clone.querySelectorAll('.edm-block').forEach(el => el.classList.remove('edm-block'));

            const zip = new JSZip();
            const imgFolder = zip.folder("images");
            let imgCount = 1;

            const allImages = clone.querySelectorAll('img');
            for (const img of allImages) {
                const src = img.getAttribute('src');
                let base64Data = null;
                let ext = 'png';

                if (src && src.startsWith('data:image/')) {
                    const parts = src.split(',');
                    const meta = parts[0].match(/:(.*?);/);
                    ext = meta ? meta[1].split('/')[1] : 'png';
                    base64Data = parts[1];
                } else if (src && src.trim() !== '') {
                    try {
                        const res = await fetch(src);
                        if (res.ok) {
                            const blob = await res.blob();
                            ext = (blob.type.split('/')[1] || 'png').replace('jpeg', 'jpg');
                            base64Data = await new Promise(resolve => {
                                const reader = new FileReader();
                                reader.onload = e => resolve(e.target.result.split(',')[1]);
                                reader.readAsDataURL(blob);
                            });
                        }
                    } catch (_) { /* skip if CORS or fetch fails */ }
                }

                if (base64Data) {
                    const fileName = `img_${String(imgCount).padStart(2, '0')}.${ext}`;
                    imgFolder.file(fileName, base64Data, {base64: true});
                    img.setAttribute('src', `images/${fileName}`);
                    imgCount++;
                }
            }

            const preheaderHTML = subject ? `\n    <div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${subject}</div>` : '';
            
            const finalHTML = `<!DOCTYPE html>
<html lang="zh-TW" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${title}</title>
    <style type="text/css">
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #faf9f7;">${preheaderHTML}
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #faf9f7; font-family: Helvetica, Arial, sans-serif;">
        <tr>
            <td align="center" style="padding: 40px 10px;">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff;">
                    <tr><td>
                        ${clone.innerHTML}
                    </td></tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

            zip.file("edm.html", finalHTML);

            try {
                const content = await zip.generateAsync({type: "blob"});
                saveAs(content, `EDM_Package_${new Date().getTime()}.zip`);
            } catch (err) { alert('打包 ZIP 時發生錯誤：' + err); }

            setupEditor();
        });
